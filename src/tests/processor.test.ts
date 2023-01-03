import { processor } from '../utils';

describe('Processor', () => {
  it('Should parse Number', () => {
    expect(processor('123 views', 'Numbers (Extract Number)')).toBe(123);

    expect(processor('123,123', 'Numbers (Extract Number)')).toBe(123123);

    expect(processor('12.5 grams', 'Numbers (Extract Number)')).toBe(12.5);

    expect(processor('12.5 grams 2', 'Numbers (Extract Number)')).toBe(12.52);
  });

  it('Should parse Number - with no numbers', () => {
    expect(processor('no views', 'Numbers (Extract Number)')).toBe(null);
  });

  it('Should parse Email with one email', () => {
    const email = processor(
      'Hello, naseef@gm.com is my email',
      'Email (Extract First Matching Email)'
    );
    console.log(email);
    expect(email).toBe('naseef@gm.com');
  });

  it('Should parse Email - with no email', () => {
    const email = processor(
      'Hello, is my email',
      'Email (Extract First Matching Email)'
    );
    console.log(email);
    expect(email).toBe(null);
  });

  it('Should parse Emails', () => {
    expect(
      processor(
        'Hello, you can reachout to me via nas@gm.com or nas@94dev.xyz ',
        'Emails (Extract All Matching Emails)'
      )
    ).toContain('nas@gm.com');
    expect(
      processor(
        'Hello, you can reachout to me via nas@gm.com or nas@94dev.xyz',
        'Emails (Extract All Matching Emails)'
      )
    ).toContain('nas@94dev.xyz');
  });

  it('Should parse Emails - with no email', () => {
    const emails = processor(
      'Hello, you can reachout to me via or nas 94dev.xyz',
      'Emails (Extract All Matching Emails)'
    );
    if (Array.isArray(emails)) {
      expect(
        emails.length
      ).toBe(0);
    }
  });

  it('Should parse Url with one url', () => {
    const url = processor(
      'Hello, www.gm.com is my email',
      'URL (Extract First Matching URL)'
    );
    console.log(url);
    expect(url).toBe('http://gm.com');
  });

  it('Should parse Url - with no url', () => {
    const url = processor(
      'Hello, is my email',
      'URL (Extract First Matching URL)'
    );
    console.log(url);
    expect(url).toBe(null);
  });

  it('Should parse Urls', () => {
    expect(
      processor(
        'Hello, you can reachout to me via https://gm.com or 94dev.xyz ',
        'URLs (Extract All Matching URLs)'
      )
    ).toContain('https://gm.com');
    expect(
      processor(
        'Hello, you can reachout to me via https://gm.com or shop.94dev.xyz ',
        'URLs (Extract All Matching URLs)'
      )
    ).toContain('http://shop.94dev.xyz');
  });

  it('Should parse Urls - with no urls', () => {
    const urls = processor(
      'Hello, you can reachout to me via or nas nas',
      'URLs (Extract All Matching URLs)'
    );
    if (Array.isArray(urls)) {
      expect(
        urls.length
      ).toBe(0);
    }
  });
});
