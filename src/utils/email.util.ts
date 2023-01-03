// https://github.com/2tunnels/extract-emails

const emailRegExp = /(\w+@\w+\.\w+)/gi;
const cfRegExp = /data-cfemail="(\w+?)"/gi;

function decodeCf(cfemail: any) {
  let e: string, r: number, a: string, n: number;

  a = cfemail;

  for (e = "", r = (<any>"0x" + <any>a.substring(0, 2)) | 0, n = 2; a.length - n; n += 2)
    e += "%" + ("0" + ((<any>"0x" + <any>a.substring(n, n+2)) ^ r).toString(16)).slice(-2);

  return decodeURIComponent(e);
}

function extractPlainEmails(html: string) {
  let emails: any = [];

  let match: any[] | null;

  while ((match = cfRegExp.exec(html)) !== null) {
    emails.push(decodeCf(match[1]));
  }

  return emails;
}

function extractCfEmails(html: string) {
  let emails: any = [];

  let match: any[] | null;

  while ((match = emailRegExp.exec(html)) !== null) {
    emails.push(match[1]);
  }

  return emails;
}

export function extractEmails(html: any) {
  if (!html) {
    throw new Error("Argument is not provided");
  }

  if (typeof html !== "string") {
    throw new Error("Argument is not a string");
  }

  let emails: string[] = [];

  emails = emails.concat(extractPlainEmails(html));
  emails = emails.concat(extractCfEmails(html));

  return emails;
}
