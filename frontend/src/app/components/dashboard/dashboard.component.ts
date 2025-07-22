import { Component, OnInit } from '@angular/core';
import { MicrofinanceService } from '../../services/microfinance.service';
import { MemberService } from '../../services/member.service';
import { LoanService } from '../../services/loan.service';
import { Microfinance } from '../../models/microfinance.model';
import { Member } from '../../models/member.model';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  microfinances: Microfinance[] = [];
  members: Member[] = [];
  loans: Loan[] = [];
  activeMembersCount = 0;
  pendingLoansCount = 0;
  totalApprovedAmount = 0;
  recentActivity: any[] = [];
  lastUpdated = new Date();

  constructor(
    private microfinanceService: MicrofinanceService,
    private memberService: MemberService,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.microfinanceService.getMicrofinances().subscribe({
      next: (response: any) => {
        this.microfinances = response.data || [];
      },
      error: (error) => console.error('Error loading microfinances:', error)
    });

    this.memberService.getMembers().subscribe({
      next: (response: any) => {
        this.members = response.data || [];
        this.activeMembersCount = this.members.filter(m => m.status === 'Active').length;
      },
      error: (error) => console.error('Error loading members:', error)
    });

    this.loanService.getLoans().subscribe({
      next: (response: any) => {
        this.loans = response.data || [];
        this.pendingLoansCount = this.loans.filter(l => l.status === 'Pending').length;
        this.totalApprovedAmount = this.loans
          .filter(l => l.status === 'Approved')
          .reduce((sum, loan) => sum + Number(loan.amount), 0);
      },
      error: (error) => console.error('Error loading loans:', error)
    });
  }
}
