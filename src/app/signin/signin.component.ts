import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.authService.getUsers().subscribe(users => {
        const userExists = users.some((user: any) => user.username === username && user.password === password);

        if (userExists) {
          alert('Login Successful!'); 
          this.router.navigate(['/dashboard']);  // Redirect to Dashboard
        } else {
          this.errorMessage = 'Invalid username or password!';
        }
      });
    }
  }
}
