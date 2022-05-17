import { DocumentClient } from "aws-sdk/clients/dynamodb";

import Apartment from "../model/apartment";

const APARTMENTS_TABLE = process.env.APARTMENTS_TABLE;

export default class ApartmentsService {

    constructor(private docClient: DocumentClient) { }

    async getAllApartments(): Promise<Apartment[]> {
        const todos = await this.docClient.scan({
            TableName: APARTMENTS_TABLE,
        }).promise()
        return todos.Items as Apartment[];
    }

    async createApartment(apartment: Apartment): Promise<Apartment> {
        await this.docClient.put({
            TableName: APARTMENTS_TABLE,
            Item: apartment
        }).promise()
        return apartment as Apartment;

    }

    async getApartment(id: string): Promise<any> {
        const apartment = await this.docClient.get({
            TableName: APARTMENTS_TABLE,
            Key: {
                apartmentsId: id
            }
        }).promise()
        if (!apartment.Item) {
            throw new Error("Id does not exit");
        }
        return apartment.Item as Apartment;
    }

    async deleteApartment(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: APARTMENTS_TABLE,
            Key: {
                apartmentsId: id
            }
        }).promise()
    }
}