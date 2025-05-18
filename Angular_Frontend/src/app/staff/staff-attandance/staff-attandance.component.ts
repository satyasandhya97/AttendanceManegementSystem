import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';  
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-staff-attandance',
  templateUrl: './staff-attandance.component.html',
  styleUrl: './staff-attandance.component.css'
})
export class StaffAttandanceComponent implements OnInit{
 @Output() public pictureTaken = new EventEmitter<WebcamImage>();

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string | undefined;
  public videoOptions: MediaTrackConstraints = {};
  public errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();

  public webcamImage: WebcamImage | null = null;
   shiftId : any

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.shiftId = params.get('id');
    });

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('Received webcam image:', webcamImage);
    this.webcamImage = webcamImage;
    this.pictureTaken.emit(webcamImage);
    if(webcamImage){
    const res = {
      id : this.shiftId,
      imageUrl : this.webcamImage.imageAsDataUrl,
      status:'Present'
    }
     this.staffService.AddAttandance(res).subscribe((res : any)=>{
      console.log('Attendance updated:', res);
      swal.fire({
        title: 'Success!',
        text: 'Attendance updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate([`/staff/shift`]);
      });
    },
    (error) => {
      console.error('Error updating attendance:', error);
    })
  }
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('Active device:', deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
