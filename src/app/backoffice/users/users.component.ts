import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../frontoffice/models/models";
import { UserService } from "../../frontoffice/services/user.service"; // ← adapte le chemin

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = "";
  selectedRole: string = "all";
  selectedStatus: string = "all";

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // page deprecated, redirect immediately to the new manager
    this.router.navigate(["/backoffice/users"], { replaceUrl: true });

    // keep a loader in case redirect fails
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...users];
      },
      error: (err) => console.error("Erreur chargement users:", err),
    });
  }

  onSearch(): void {
    this.filteredUsers = this.users.filter((u) => {
      const lowerTerm = this.searchTerm.toLowerCase();
      const matchSearch =
        !this.searchTerm ||
        u.name.toLowerCase().includes(lowerTerm) ||
        (u.email ? u.email.toLowerCase().includes(lowerTerm) : false);
      const matchRole =
        this.selectedRole === "all" || u.role === this.selectedRole;
      const matchStatus =
        this.selectedStatus === "all" || u.status === this.selectedStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }
}
