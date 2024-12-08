import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ZooService {

    constructor() {
    }

    createZoo(zooName: string, zooLocation: string, zooDescription: string, zooContact: string, zooImage: File | null): any {

    }
}
