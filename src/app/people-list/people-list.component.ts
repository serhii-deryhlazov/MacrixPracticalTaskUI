import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
})
export class PeopleListComponent implements OnInit {
  people: Person[] = new Array<Person>();

  isFormFolded: boolean = true;
  isEditFormFolded: boolean = true;

  toggleForm(): void {
    this.isFormFolded = !this.isFormFolded;
    if (this.isFormFolded) {
      this.clearForm();
    }
  }

  editedPerson: Person | null = null;

  newPerson: Person = {
    firstName: '',
    lastName: '',
    streetName: '',
    houseNumber: '',
    postalCode: '',
    apartmentNumber: '',
    town: '',
    phoneNumber: '',
    dateOfBirth: new Date(),
  };

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.peopleService.getPeople().subscribe((people) => {
      this.people = people;
    });
  }

  addPerson(): void {
    this.newPerson.dateOfBirth = new Date(this.newPerson.dateOfBirth);

    if (!this.validatePerson(this.newPerson)) {
      alert('Please fill in all required fields.');
      return;
    }

    this.peopleService.addPerson(this.newPerson).subscribe((addedPerson) => {
      this.newPerson = {
        firstName: '',
        lastName: '',
        streetName: '',
        houseNumber: '',
        postalCode: '',
        apartmentNumber: '',
        town: '',
        phoneNumber: '',
        dateOfBirth: new Date(),
      };

      this.loadPeople();

      this.toggleForm();
    });
  }

  editPerson(person: Person): void {
    this.editedPerson = { ...person };

    this.editedPerson.dateOfBirth = new Date(this.editedPerson.dateOfBirth);
  
    this.isEditFormFolded = false;
  }

  saveEdit()
  {
    if (this.editedPerson)
    {
      this.editedPerson.dateOfBirth = new Date(this.editedPerson.dateOfBirth);

      this.peopleService.updatePerson(this.editedPerson).subscribe((updatedPerson) => {
        this.loadPeople();
      });
  
      this.editedPerson = null;
  
      this.isEditFormFolded = true;
    }
  }

  deletePerson(id: number | undefined): void {
    if (id)
    {
      this.peopleService.deletePerson(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }

  private clearForm(): void {
    this.newPerson = {
      firstName: '',
      lastName: '',
      streetName: '',
      houseNumber: '',
      apartmentNumber: '',
      postalCode: '',
      town: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
    };
  }

  private validatePerson(person: Person): boolean {
    return (
      person.firstName.trim() !== '' &&
      person.lastName.trim() !== '' &&
      person.streetName.trim() !== '' &&
      person.apartmentNumber.trim() !== '' &&
      person.houseNumber.trim() !== '' &&
      person.postalCode.trim() !== '' &&
      person.town.trim() !== '' &&
      person.phoneNumber.trim() !== '' &&
      person.dateOfBirth instanceof Date
    );
  }
}
