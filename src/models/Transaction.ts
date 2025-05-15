export interface Transaction {
    id: string
    amount: number
    date: string
    description: string
    type: 'credit' | 'debit'
    accountNumber: string
    referenceId: string
}
