import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { MicrofinanceService } from '../../services/microfinance.service';
import { Member, CreateMemberRequest } from '../../models/member.model';
import { Microfinance } from '../../models/microfinance.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  members: Member[] = [];
  microfinances: Microfinance[] = [];
  memberForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private microfinanceService: MicrofinanceService
  ) {
    this.memberForm = this.fb.group({
      microfinance_id: ['', Validators.required],
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      id_number: ['', [Validators.required, Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMembers();
    this.loadMicrofinances();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (response: any) => {
        this.members = response.data || [];
      },
      error: (error) => {
        console.error('Error loading members:', error);
        alert('Error loading members. Please try again.');
      }
    });
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
    if (this.memberForm.valid) {
      this.loading = true;
      const memberData: CreateMemberRequest = this.memberForm.value;
      
      this.memberService.createMember(memberData).subscribe({
        next: (response: any) => {
          this.members.unshift(response.data);
          this.memberForm.reset();
          this.loading = false;
          alert('Member registered successfully!');
        },
        error: (error) => {
          this.loading = false;
          console.error('Error registering member:', error);
          alert('Error registering member. Please check your input and try again.');
        }
      });
    }
  }

  activateMember(memberId: string): void {
    if (confirm('Are you sure you want to activate this member?')) {
      this.loading = true;
      
      this.memberService.activateMember(memberId).subscribe({
        next: (response: any) => {
          const memberIndex = this.members.findIndex(m => m.id === memberId);
          if (memberIndex !== -1) {
            this.members[memberIndex] = response.data;
          }
          this.loading = false;
          alert('Member activated successfully!');
        },
        error: (error) => {
          this.loading = false;
          console.error('Error activating member:', error);
          alert('Error activating member. Please try again.');
        }
      });
    }
  }
}
