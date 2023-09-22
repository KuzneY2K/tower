import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
      .put('', this.editAccount)
  }

  async editAccount(req, res, next) {
    try {
      let accountId = req.userInfo.id
      let edits = req.body
      let accountToEdit = await accountService.editAccount(accountId, edits)
      res.send(accountToEdit)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyTickets(req, res, next) {
    try {
      const myTickets = await ticketsService.getMyTickets(req.userInfo.id)
      res.send(myTickets)
    } catch (error) {
      next(error)
    }
  }
}
