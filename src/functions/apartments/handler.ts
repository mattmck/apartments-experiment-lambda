import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { formatJSONResponse } from '../../libs/api-gateway'
import { middyfy } from '../../libs/lambda'
import apartmentsService from '../../services'

import { v4 } from 'uuid'

export const getAllApartments = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const apartments = await apartmentsService.getAllApartments()
  return formatJSONResponse({
    apartments
  })
})

export const createApartment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const uuid = v4()
    const body = JSON.parse(event.body)
    const apartment = {
      id: uuid,
      name: body.name,
      address: body.address,
      glyph: body.glyph,
      website: body.website,
      nominatim: undefined
    }

    const created = await apartmentsService.createApartment(apartment)
    return formatJSONResponse({
      created
    })
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
})

export const getAparment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id
  try {
    const apartment = await apartmentsService.getApartment(id)
    return formatJSONResponse({
      apartment, id
    })
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
})

export const updateApartment = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id
  const body = JSON.parse(event.body)
  const apartment = {
    id,
    name: body.name,
    address: body.address,
    glyph: body.glyph,
    website: body.website,
    nominatim: body.nominatim
  }

  try {
    const updated = await apartmentsService.createApartment(apartment)
    return formatJSONResponse({
      updated, id
    })
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
})

export const deleteTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id
  try {
    const deleted = await apartmentsService.deleteApartment(id)
    return formatJSONResponse({
      deleted, id
    })
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    })
  }
})
