import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.component.html'
})
export class ActivityDescriptionComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() name: string;
  activityDescriptionFields = 'activityDescriptionFields';

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false
  };

  constructor(private formBuilder: FormBuilder, private applicationFieldsService: ApplicationFieldsService) {}

  ngOnInit() {
    const activityDescription = this.formBuilder.group({
      numberServiceDaysRequested: ['', [Validators.required]],
      numberOfTrips: ['', [Validators.required]],
      partySize: ['', [Validators.required]],
      locationDescription: ['', [Validators.required]],
      servicesProvided: ['', [Validators.required]],
      audienceDescription: ['', [Validators.required]],
      needGovernmentFacilities: [false],
      listOfGovernmentFacilities: [''],
      needTemporaryImprovements: [false],
      listOfTemporaryImprovements: [''],
      haveMotorizedEquipment: [false],
      statementOfMotorizedEquipment: [''],
      haveLivestock: [false],
      statementOfTransportationOfLivestock: [''],
      needAssignedSite: [false],
      statementOfAssignedSite: [''],
      descriptionOfCleanupAndRestoration: ['', [Validators.required]]
    });
    this.parentForm.addControl('activityDescriptionFields', activityDescription);

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.needGovernmentFacilities'),
      this.parentForm.get('activityDescriptionFields.listOfGovernmentFacilities')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.needTemporaryImprovements'),
      this.parentForm.get('activityDescriptionFields.listOfTemporaryImprovements')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.haveMotorizedEquipment'),
      this.parentForm.get('activityDescriptionFields.statementOfMotorizedEquipment')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.haveLivestock'),
      this.parentForm.get('activityDescriptionFields.statementOfTransportationOfLivestock')
    );

    this.applicationFieldsService.simpleRequireToggle(
      this.parentForm.get('activityDescriptionFields.needAssignedSite'),
      this.parentForm.get('activityDescriptionFields.statementOfAssignedSite')
    );
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }
}