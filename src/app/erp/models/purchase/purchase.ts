import { Supplier } from './../customer/customer';
export class Purchase {
    public id: number;
    public createdDate: string;
    public updatedDate: string;

    public supplierId: number;
    public supplierName: string;
    public purchaseDate: string;
    public buyTotal: number;
    public payAmount: number;
    public creditAmount: number;
    public previousCreditAmount: number;
    public supplier: Supplier;
    public purchaseItemDtoList: PurchaseItem[];
}

export class PurchaseItem {
    public id: number;
    public createdDate: string;
    public updatedDate: string;

    public purchaseId: number;
    public itemId: number;
    public itemName: string;
    public qty: number;
    public closingQty: number;
    public price: number;
    public total: number;
}

export class PurchasePayment {
    public id: number;
    public createdDate: string;
    public updatedDate: string;

    public purchaseId: number;
    public supplierId: number;
    public supplierName: string;
    public payDate: string;
    public payAmount: number;
    public remark: string;
}

export class PurchaseHeader{
    public totalPayAmount: number;
    public totalCreditAmount: number;
    public totalBuyAmount: number;
    public purchaseHeaderList: PurchaseHeaderList[];
}

export class PurchaseHeaderList {
    public purchaseId: number;
    public supplierId: number;
    public supplierName: string;
    public purchaseDate: Date;
    public buyTotal: number;
    public payAmount: number;
    public creditAmount: number;
    public totalRecord: number;
}

export class PurchasePaymentList {
    public paymentId: number;
    public supplierId: number;
    public purchaseId: number;
    public supplierName: string;
    public payDate: Date;
    public payAmount: number;
    public type: string;
    public remark: string;
    public totalRecord: number;
}

export class PurchaseListSearchModel {
    public purchaseId: number;
    public supplierId: string[];
    public type: string[];
    public purchaseDate: string;
    public payDate: string;
    public remark: string;

    public pagePerRow: number;
	public pageNumber: number;
	public sortName: string;
	public sortOrder: number;
	public exportAll: boolean;
}

export class ClosingModel {
    id: number;
    itemId: number;
    itemName: string;
    createdDate: string;
    updatedDate: string;
    qty: number;
}