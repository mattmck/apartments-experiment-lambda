import { handlerPath } from '../../libs/handler-resolver'

export const getAllApartments = {
  handler: `${handlerPath(__dirname)}/handler.getAllApartments`,
  events: [
    {
      http: {
        method: 'get',
        path: 'apartments/'
      }
    }
  ]
}

export const createApartment = {
  handler: `${handlerPath(__dirname)}/handler.createApartment`,
  events: [
    {
      http: {
        method: 'post',
        path: 'apartments'
      }
    }
  ]
}

export const getApartment = {
  handler: `${handlerPath(__dirname)}/handler.getApartment`,
  events: [
    {
      http: {
        method: 'get',
        path: 'apartments/{id}'
      }
    }
  ]
}

export const updateApartment = {
  handler: `${handlerPath(__dirname)}/handler.updateApartment`,
  events: [
    {
      http: {
        method: 'put',
        path: 'apartments/{id}'
      }
    }
  ]
}

export const deleteApartment = {
  handler: `${handlerPath(__dirname)}/handler.deleteApartment`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'apartments/{id}'
      }
    }
  ]
}
