import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { personData } from '../userData';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  users: personData[] = [];
  editForm!: FormGroup;
  
  editingUser: personData | null = null;

  
  constructor(private fb: FormBuilder, private service: ServiceService) { }
  // fetching data
  ngOnInit() {
    this.service.getData().subscribe((data) => {
      this.users = data;
    })

  }

  //  adding data
  getUserData(data: personData) {
    this.service.addPersonData(data).subscribe(result => {
      console.log(result);
    })
  }

  // deleting data
  onDelete(id: number) {
    this.service.deleteItem(id).subscribe((res) => {
      alert('one item deleted')
      this.users = res;
    })
  }
 
  //updating data
  onEdit(user: personData) {
    this.editingUser = { ...user };
  }
  onUpdate() {
    if (this.editingUser) {
      this.service.updateData(this.editingUser.id, this.editingUser).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.editingUser = null;
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
  cancelEdit() {
    this.editingUser = null;
  }

}

