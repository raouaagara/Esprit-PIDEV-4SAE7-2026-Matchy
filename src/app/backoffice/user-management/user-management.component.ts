import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "../../frontoffice/models/models";
import { UserService } from "../../frontoffice/services/user.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  activeTab = "all";
  searchTerm = "";
  selectedRole = "all";
  selectedStatus = "all";

  // pagination/tabs counts will be computed from real data
  tabs = [
    { id: "all", label: "All Users", count: 0 },
    { id: "freelancers", label: "Freelancers", count: 0 },
    { id: "clients", label: "Clients", count: 0 },
    { id: "admins", label: "Admins", count: 0 },
  ];

  users: User[] = [];
  filteredUsers: User[] = [];

  // modal and form state for create/edit
  showModal = false;
  isEditMode = false;
  currentUser: User = this.getEmptyUser();

  // ban confirmation state (separate from creation/edit)
  showBanModal = false;
  selectedUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    console.log("Loading users...");
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log(
          "✅ Users loaded successfully:",
          users,
          "Count:",
          users.length,
        );
        this.users = users;
        this.filteredUsers = [...users];
        this.updateTabCounts();
      },
      error: (err) => {
        console.error("❌ Error loading users:", err);
        console.error("Error status:", err.status);
        console.error("Error message:", err.message);
        console.error("Full error:", JSON.stringify(err.error));
        this.users = [];
        this.filteredUsers = [];
        this.updateTabCounts();
      },
    });
  }

  updateTabCounts(): void {
    const all = this.users.length;
    const freelancers = this.users.filter(
      (u) => u.role === "freelancer",
    ).length;
    const clients = this.users.filter((u) => u.role === "client").length;
    const admins = this.users.filter((u) => u.role === "admin").length;
    this.tabs = [
      { id: "all", label: "All Users", count: all },
      { id: "freelancers", label: "Freelancers", count: freelancers },
      { id: "clients", label: "Clients", count: clients },
      { id: "admins", label: "Admins", count: admins },
    ];
  }

  get filteredUsersList() {
    // keep old getter for compatibility in template if needed
    return this.filteredUsers;
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter((u) => {
      const matchSearch =
        !term ||
        u.name.toLowerCase().includes(term) ||
        (u.email ? u.email.toLowerCase().includes(term) : false);
      const matchRole =
        this.selectedRole === "all" || u.role === this.selectedRole;
      const matchStatus =
        this.selectedStatus === "all" || u.status === this.selectedStatus;
      const matchTab =
        this.activeTab === "all" ||
        (this.activeTab === "freelancers" && u.role === "freelancer") ||
        (this.activeTab === "clients" && u.role === "client") ||
        (this.activeTab === "admins" && u.role === "admin");
      return matchTab && matchSearch && matchRole && matchStatus;
    });
  }

  /* modal helpers */
  openCreateModal(): void {
    this.isEditMode = false;
    this.currentUser = this.getEmptyUser();
    this.showModal = true;
  }

  openEditModal(user: User): void {
    this.isEditMode = true;
    this.currentUser = { ...user };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentUser = this.getEmptyUser();
  }

  submitUser(form: NgForm): void {
    // called from the form's ngSubmit event
    if (form.invalid) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
    this.saveUser();
  }

  private buildPayload(): any {
    // include only the fields the API expects; avoid sending extra properties
    const payload: any = {
      name: this.currentUser.name,
      email: this.currentUser.email,
      // backend enum values are uppercase; perform mapping for known roles
      role: this.currentUser.role
        ? this.currentUser.role.toString().toUpperCase()
        : undefined,
      // status might also be enum; normalize just in case
      status: this.currentUser.status
        ? this.currentUser.status.toString().toUpperCase()
        : undefined,
      city: this.currentUser.city,
    };
    if (this.isEditMode && this.currentUser.id != null) {
      payload.id = this.currentUser.id;
    }
    return payload;
  }

  saveUser(): void {
    const payload = this.buildPayload();
    console.log("saveUser payload:", payload);

    if (this.isEditMode) {
      this.userService.updateUser(payload).subscribe({
        next: (res) => {
          console.log("user updated response:", res);
          alert("User updated successfully.");
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => {
          console.error("Error updating user:", err);
          const detail = err.error
            ? JSON.stringify(err.error)
            : err.message || err;
          alert("Failed to update user: " + detail);
        },
      });
    } else {
      this.userService.createUser(payload).subscribe({
        next: (res) => {
          console.log("user created response:", res);
          alert("User created successfully.");
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => {
          console.error("Error creating user:", err);
          const detail = err.error
            ? JSON.stringify(err.error)
            : err.message || err;
          alert("Failed to create user: " + detail);
        },
      });
    }
  }

  deleteUser(user: User): void {
    if (user.id && confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error("Error deleting user:", err),
      });
    }
  }

  /* ban logic remains unchanged */
  openBanModal(user: any): void {
    this.selectedUser = user;
    this.showBanModal = true;
  }

  confirmBan(): void {
    if (this.selectedUser) {
      this.selectedUser.status =
        this.selectedUser.status === "banned" ? "active" : "banned";
    }
    this.showBanModal = false;
    this.selectedUser = null;
  }

  verifyUser(user: any): void {
    user.verified = true;
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }

  getRoleClass(role?: string): string {
    return (
      { admin: "danger", client: "primary", freelancer: "success" }[
        role || ""
      ] || "primary"
    );
  }

  getPlanClass(plan?: string): string {
    return (
      { free: "muted", pro: "primary", elite: "warning" }[plan || ""] ||
      "primary"
    );
  }

  private getEmptyUser(): User {
    return { name: "", email: "", role: "client", status: "active", city: "" };
  }
}
