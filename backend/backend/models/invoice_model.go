package models

type Invoice struct {
	InvoiceID   int64  `json:"invoiceID"`
	Name        string `json:"name"`
	MobileNo    string `json:"mobileNo"`
	Email       string `json:"email"`
	Address     string `json:"address"`
	BillingType string `json:"billingType"`
}
