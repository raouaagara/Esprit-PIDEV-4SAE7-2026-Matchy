import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap, map } from "rxjs";
import { Certification } from "../models/certification.model";
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
export class CertificationService {
  private apiUrl = `${environment.apiUrl}/Certification`;
  private certificationsSubject = new BehaviorSubject<Certification[]>([]);
  public certifications$ = this.certificationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCertifications();
  }

  private loadCertifications(): void {
    this.http
      .get(`${this.apiUrl}/getAllCertifications`, { responseType: "text" })
      .subscribe({
        next: (txt) => {
          try {
            const certifications = parseWithoutCycles(txt) as Certification[];
            console.log(
              "CertificationService loaded",
              certifications.length,
              "items",
            );
            this.certificationsSubject.next(this.sanitizeList(certifications));
          } catch (err) {
            console.error("[DEBUG] Error parsing certifications:", err);
            this.certificationsSubject.next([]);
          }
        },
        error: (error) => {
          console.error("[DEBUG] Error loading certifications:", error);
          this.certificationsSubject.next([]);
        },
      });
  }

  getAllCertifications(): Observable<Certification[]> {
    return this.http
      .get(`${this.apiUrl}/getAllCertifications`, { responseType: "text" })
      .pipe(
        map((txt: string) => {
          console.log("[DEBUG] Raw certification response length:", txt.length);
          const parsed = parseWithoutCycles(txt) as Certification[];
          console.log("[DEBUG] Parsed certifications count:", parsed.length);
          if (parsed.length > 0)
            console.log("[DEBUG] First certification:", parsed[0]);
          return parsed;
        }),
        map((certifications) => this.sanitizeList(certifications)),
        tap((certifications) =>
          this.certificationsSubject.next(certifications),
        ),
      );
  }

  private sanitizeList(list: Certification[]): Certification[] {
    return list.map((c) => {
      const copy: any = { ...c };
      if (copy.contentId != null) copy.contentId = Number(copy.contentId);
      if (copy.userId != null) copy.userId = Number(copy.userId);
      delete copy.content;
      delete copy.user;
      return copy as Certification;
    });
  }

  getCertificationById(id: number): Observable<Certification> {
    return this.http.get<Certification>(`${this.apiUrl}/${id}`);
  }

  createCertification(certification: Certification): Observable<Certification> {
    return this.http
      .post<Certification>(`${this.apiUrl}/addCertification`, certification)
      .pipe(tap(() => this.loadCertifications()));
  }

  updateCertification(certification: Certification): Observable<Certification> {
    return this.http
      .put<Certification>(`${this.apiUrl}/modifierCertification`, certification)
      .pipe(tap(() => this.loadCertifications()));
  }

  deleteCertification(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/deleteCertification/${id}`)
      .pipe(tap(() => this.loadCertifications()));
  }
}
