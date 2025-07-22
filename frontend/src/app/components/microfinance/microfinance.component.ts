import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MicrofinanceService } from '../../services/microfinance.service';
import { Microfinance, CreateMicrofinanceRequest } from '../../models/microfinance.model';

@Component({
  selector: 'app-microfinance',
  templateUrl: './microfinance.component.html',
  styleUrls: ['./microfinance.component.css']
})
export class MicrofinanceComponent implements OnInit {
  microfinances: Microfinance[] = [];
  microfinanceForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private microfinanceService: MicrofinanceService
  ) {
    this.microfinanceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.loadMicrofinances();
  }

  loadMicrofinances(): void {
    this.microfinanceService.getMicrofinances().subscribe({
      next: (response: any) => {
        this.microfinances = response.data || [];
      },
      error: (error) => {
        console.error('Error loading microfinances:', error);
        alert('Error loading microfinances. Please try again.');
      }
    });
  }

  onSubmit(): void {
    if (this.microfinanceForm.valid) {
      this.loading = true;
      const microfinanceData: CreateMicrofinanceRequest = this.microfinanceForm.value;
      
      this.microfinanceService.createMicrofinance(microfinanceData).subscribe({
        next: (response: any) => {
          this.microfinances.unshift(response.data);
          this.microfinanceForm.reset();
          this.loading = false;
          alert('Microfinance created successfully!');
        },
        error: (error) => {
          this.loading = false;
          console.error('Error creating microfinance:', error);
          alert('Error creating microfinance. Please check your input and try again.');
        }
      });
    }
  }
}
