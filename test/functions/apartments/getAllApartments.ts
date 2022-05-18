import * as chai from 'chai'
import axios, { AxiosResponse } from 'axios'
import { describe, before, it } from 'mocha'

const expect = chai.expect
const should = chai.should

describe('GET /apartments', () => {
  let response: AxiosResponse<any, any>

  before((done) => {
    axios.get('http://localhost:3000/test/' + 'apartments')
      .then(o => {
        console.log('got a response: %s', o)
        response = o
        done()
      })
      .catch(err => done(err))
  })

  it('response should be not null', (done) => {
    should().exist(response)
    expect(response.status).to.eq(200)
    done()
  })

  it('status code should be 200', (done) => {
    expect(response.status).to.eq(200)
    done()
  })

  it('there should be two results', (done) => {
    expect(response.data.apartments.length).to.eq(2)
    done()
  })
})
