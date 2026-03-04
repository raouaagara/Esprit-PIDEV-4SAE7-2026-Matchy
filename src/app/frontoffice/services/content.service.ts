import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap, map } from "rxjs";
import { Content } from "../models/content.model";
import { environment } from "../../../environments/environment";
function parseWithoutCycles(text: string): any {
  let result = "";
  let i = 0;
  const len = text.length;

  while (i < len) {
    // Check for "assessment": {
    if (text[i] === '"' && text.substr(i, 12) === '"assessment"') {
      // Look for : { pattern
      let j = i + 12;
      while (j < len && (text[j] === " " || text[j] === "\t")) j++;
      if (j < len && text[j] === ":") {
        j++;
        while (j < len && (text[j] === " " || text[j] === "\t")) j++;
        if (j < len && text[j] === "{") {
          // Found "assessment": { - skip entire object by counting braces
          j++; // skip opening {
          let braceCount = 1;
          while (j < len && braceCount > 0) {
            if (text[j] === "{") braceCount++;
            else if (text[j] === "}") braceCount--;
            j++;
          }
          // Skip trailing comma and whitespace
          while (
            j < len &&
            (text[j] === "," ||
              text[j] === " " ||
              text[j] === "\t" ||
              text[j] === "\n" ||
              text[j] === "\r")
          )
            j++;
          i = j;
          continue;
        }
      }
    }

    // Check for "content": {
    if (text[i] === '"' && text.substr(i, 9) === '"content"') {
      // Look for : { pattern
      let j = i + 9;
      while (j < len && (text[j] === " " || text[j] === "\t")) j++;
      if (j < len && text[j] === ":") {
        j++;
        while (j < len && (text[j] === " " || text[j] === "\t")) j++;
        if (j < len && text[j] === "{") {
          // Found "content": { - skip entire object by counting braces
          j++; // skip opening {
          let braceCount = 1;
          while (j < len && braceCount > 0) {
            if (text[j] === "{") braceCount++;
            else if (text[j] === "}") braceCount--;
            j++;
          }
          // Skip trailing comma and whitespace
          while (
            j < len &&
            (text[j] === "," ||
              text[j] === " " ||
              text[j] === "\t" ||
              text[j] === "\n" ||
              text[j] === "\r")
          )
            j++;
          i = j;
          continue;
        }
      }
    }

    result += text[i];
    i++;
  }

  // Clean up any remaining trailing commas
  result = result.replace(/,\s*([}\]])/g, "$1");

  try {
    return JSON.parse(result);
  } catch (e) {
    console.error(
      "[ERROR] JSON parse failed. Length before:",
      text.length,
      "after:",
      result.length,
      "Error:",
      e,
    );
    return [];
  }
}
@Injectable({
  providedIn: "root",
})
export class ContentService {
  private apiUrl = `${environment.apiUrl}/Content`;
  private contentsSubject = new BehaviorSubject<Content[]>([]);
  public contents$ = this.contentsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadContents();
  }

  private loadContents(): void {
    this.http
      .get(`${this.apiUrl}/getAllContents`, { responseType: "text" })
      .subscribe({
        next: (txt) => {
          try {
            console.log("[DEBUG] Raw content response in loadContents:", txt);
            const contents = parseWithoutCycles(txt) as Content[];
            console.log("[DEBUG] Parsed contents in loadContents:", contents);
            console.log("ContentService loaded", contents.length, "items");
            this.contentsSubject.next(this.sanitizeList(contents));
          } catch (err) {
            console.error("[DEBUG] Error parsing contents:", err);
            this.contentsSubject.next([]);
          }
        },
        error: (error) => {
          console.error("[DEBUG] Error loading contents:", error);
          this.contentsSubject.next([]);
        },
      });
  }

  getAllContents(): Observable<Content[]> {
    return this.http
      .get(`${this.apiUrl}/getAllContents`, { responseType: "text" })
      .pipe(
        map((txt: string) => {
          try {
            console.log("[DEBUG] Raw content response length:", txt.length);
            const parsed = parseWithoutCycles(txt) as Content[];
            console.log("[DEBUG] Parsed contents count:", parsed.length);
            if (parsed.length > 0) {
              console.log("[DEBUG] First content:", parsed[0]);
            }
            return parsed;
          } catch (e) {
            console.error("[ERROR] Failed to parse contents:", e);
            throw e;
          }
        }),
        map((contents) => this.sanitizeList(contents)),
        tap((contents) => this.contentsSubject.next(contents)),
      );
  }

  /** remove nested relations and coerce ids */
  private sanitizeList(contents: Content[]): Content[] {
    return contents.map((c) => {
      const copy: any = { ...c };
      if (copy.contentId != null) {
        copy.contentId = Number(copy.contentId);
      }
      delete copy.assessment;
      delete copy.certifications;
      return copy as Content;
    });
  }

  getContentById(id: number): Observable<Content> {
    return this.http.get<Content>(`${this.apiUrl}/${id}`);
  }

  createContent(content: Content): Observable<Content> {
    return this.http
      .post<Content>(`${this.apiUrl}/addContent`, content)
      .pipe(tap(() => this.loadContents()));
  }

  updateContent(content: Content): Observable<Content> {
    return this.http
      .put<Content>(`${this.apiUrl}/modifierContent`, content)
      .pipe(tap(() => this.loadContents()));
  }

  deleteContent(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/deleteContent/${id}`)
      .pipe(tap(() => this.loadContents()));
  }
}
