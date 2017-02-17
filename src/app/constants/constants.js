const CREDIT_CARD_TYPES = {
  visa: 'Visa',
  mastercard: 'MasterCard',
  discover: 'Discover',
  amex: 'American Express'
}

const PAYMENT_TYPES = {
  cash: 'Cash',
  check: 'Check',
  visa: CREDIT_CARD_TYPES.visa,
  mastercard: CREDIT_CARD_TYPES.mastercard,
  discover: CREDIT_CARD_TYPES.discover,
  amex: CREDIT_CARD_TYPES.amex
}

const HTTP_HEADERS = {
  totalCount: 'SirGrenti-Total-Count',
  rateLimit: {
    limit: 'SirGrenti-Rate-Limit-Limit',
    remaining: 'SirGrenti-Rate-Limit-Remaining',
    reset: 'SirGrenti-Rate-Limit-Reset'
  },
  link: 'Link'
}

module.exports = exports = {
  HTTP_HEADERS,
  CREDIT_CARD_TYPES,
  PAYMENT_TYPES}
