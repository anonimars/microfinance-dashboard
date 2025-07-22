import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { MemberService } from '../../services/member.service';
import { Loan, CreateLoanRequest } from '../../models/loan.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: Loan[] = [];
  activeMembers: Member[] = [];
  loanForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private memberService: MemberService
  ) {
    this.loanForm = this.fb.group({
      member_id: ['', Validators.required],
      loan_type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      repayment_period: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadLoans();
    this.loadActiveMembers();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe({
      next: (response: any) => {
        this.loans = response.data || [];
      },
      error: (error) => {
        console.error('Error loading loans:', error);
        alert('Error loading loans. Please try again.');
      }
    });
  }

  loadActiveMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (response: any) => {
        this.activeMembers = (response.data || []).filter((member: Member) => member.status === 'Active');
      },
      error: (error) => {
        console.error('Error loading members:', error);
        alert('Error loading members. Please try again.');
      }
    });
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      this.loading = true;
      const loanData: CreateLoanRequest = this.loanForm.value;
      
      this.loanService.createLoan(loanData).subscribe({
        next: (response: any) => {
          this.loans.unshift(response.data);
          this.loanForm.reset();
          this.loading = false;
          alert('Loan application submitted successfully!');
        },
        error: (error) => {
          this.loading = false;
          console.error('Error submitting loan:', error);
          alert(error.error?.message || 'Error submitting loan application. Please check your input and try again.');
        }
      });
    }
  }
}
