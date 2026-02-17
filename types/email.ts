export type PostmarkInboundEmail = {
  Subject: string
  TextBody: string
  HtmlBody: string
  FromName?: string
  From?: string
  Date?: string
  To?: string
  MessageID?: string
}
