import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './appcontact.component.html',
    styleUrls: ['./appcontact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit {

    public form!: FormGroup;
    public sent: boolean = false;

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            subject: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        if (this.form.invalid) return;

        console.log('Mensaje enviado:', this.form.value);

        this.sent = true;
        this.form.reset();
    }
}