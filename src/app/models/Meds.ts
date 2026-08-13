export interface Meds {
    _id: string,
    patientId: string,
    timezoneOffset: number,
    medicines: [
        {_id: string,
        name: string,
        type: string,
        time: number,
        days: [string],
        genericName: string,
        duration: string}
    ]
}