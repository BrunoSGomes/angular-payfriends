import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-button-renderer',
    template: `
    <ion-button size="small" fill="clear" (click)="onClick($event, 'patch')">Alterar</ion-button>
    <ion-button size="small" fill="clear" (click)="onClick($event, 'delete')">Excluir</ion-button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

    params;
    label: string;

    agInit(params): void {
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event, type: string) {
        if (this.params.onClick instanceof Function) {
            const params = {
                event: $event,
                rowData: this.params.node.data,
                type: type
            }
            this.params.onClick(params);
        }
    }
}