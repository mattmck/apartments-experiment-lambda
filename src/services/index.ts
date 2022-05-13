import dynamoDBClient from "../model";
import ApartmentsService from "./apartmentsService";

const apartmentsService = new ApartmentsService(dynamoDBClient());

export default apartmentsService;