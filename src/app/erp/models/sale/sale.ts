import { Customer } from 'src/app/erp/models/customer/customer';
export class Sale {
    public id: number;
    public customerId: number;
    public saleItemListDto: SaleItem[];
    public orderDate: string;
    public payAmount: number;
    public creditAmount: number;
    public totalAmount: number;
    public remark: string;
    public isComplete: Boolean;
    public status: Boolean;
    public totalCreditAmount: number;
    public totalPayAmount: number;
    public totalSaleAmount: number;
    public customer: Customer;
}

export class SaleItem {
    public id: number;
    public itemId: number;
    public name: string;
    public qty: number;
    public price: number;
    public total: number;
    public closingQty: number;
}

export class SaleListSearchModel {
    public id: number;
    public customerId: string;
    public orderDate: string;
    public pagePerRow: number;
    public pageNumber: number;
    public sortName: string;
    public sortOrder: number;
}
export class SaleHeader {
    public totalCreditAmount: number;
	public totalPayAmount: number;
	public totalSellAmount: number;
    public saleItemList: SaleHeaderList[];
}
export class SaleHeaderList {
    public id: number;
    public customerId: number;
    public customerName: string;
    public payAmount: number;
    public creditAmount: number;
    public totalAmount: number;
    public orderDate: Date;
    public totalRecord: number;
}

export class PaymentList {
    public totalPayAmount: number;
    public paymentList: Payment[];
}

export class Payment {
    public paymentId: number;
    public customerId: number;
    public saleId: number;
    public customerName: string;
    public payDate: string;
    public payAmount: number;
    public remark: string;
    public type: string;
    public createdDate: string;
    public updatedDate: string;
}

export class PaymentSearchModel {
    public id: number;
    public customerId: string;
    public payDate: string;
    public type: string;
    public remark: string;

    public pagePerRow: number;
    public pageNumber: number;
    public sortName: string;
    public sortOrder: number;
}