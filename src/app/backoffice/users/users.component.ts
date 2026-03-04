import { Component, OnInit } from "@angular/core";
import { User } from "../../frontoffice/models/models";

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

  ngOnInit(): void {
    // Data will come from UserService — currently empty
    this.filteredUsers = [...this.users];
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
