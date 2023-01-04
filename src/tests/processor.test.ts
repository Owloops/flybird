import { processor } from '../utils';
import { expect } from 'chai';

describe('Processor', () => {
  it('Should parse Number', () => {
    expect(processor('123 views', 'Numbers (Extract Number)')).to.eq(123);

    expect(processor('123,123', 'Numbers (Extract Number)')).to.eq(123123);

    expect(processor('12.5 grams', 'Numbers (Extract Number)')).to.eq(12.5);

    expect(processor('12.5 grams 2', 'Numbers (Extract Number)')).to.eq(12.52);
  });

  it('Should parse Number - with no numbers', () => {
    expect(processor('no views', 'Numbers (Extract Number)')).to.eq(null);
  });

  it('Should parse Email with one email', () => {
    const email = processor(
      'Hello, naseef@gm.com is my email',
      'Email (Extract First Matching Email)'
    );
    (email);
    expect(email).to.eq('naseef@gm.com');
  });

  it('Should parse Email - with no email', () => {
    const email = processor(
      'Hello, is my email',
      'Email (Extract First Matching Email)'
    );
    expect(email).to.eq(null);
  });

  it('Should parse Emails', () => {
    expect(
      processor(
        'Hello, you can reachout to me via nas@gm.com or nas@94dev.xyz ',
        'Emails (Extract All Matching Emails)'
      )
    ).to.contain('nas@gm.com');
    expect(
      processor(
        'Hello, you can reachout to me via nas@gm.com or nas@94dev.xyz',
        'Emails (Extract All Matching Emails)'
      )
    ).to.contain('nas@94dev.xyz');
  });

  it('Should parse Emails - with no email', () => {
    const emails = processor(
      'Hello, you can reachout to me via or nas 94dev.xyz',
      'Emails (Extract All Matching Emails)'
    );
    if (Array.isArray(emails)) {
      expect(
        emails.length
      ).to.eq(0);
    }
  });

  it('Should parse Url with one url', () => {
    const url = processor(
      'Hello, www.gm.com is my email',
      'URL (Extract First Matching URL)'
    );
    expect(url).to.eq('http://gm.com');
  });

  it('Should parse Url - with no url', () => {
    const url = processor(
      'Hello, is my email',
      'URL (Extract First Matching URL)'
    );
    expect(url).to.eq(null);
  });

  it('Should parse Urls', () => {
    expect(
      processor(
        'Hello, you can reachout to me via https://gm.com or 94dev.xyz ',
        'URLs (Extract All Matching URLs)'
      )
    ).to.contain('https://gm.com');
    expect(
      processor(
        'Hello, you can reachout to me via https://gm.com or shop.94dev.xyz ',
        'URLs (Extract All Matching URLs)'
      )
    ).to.contain('http://shop.94dev.xyz');
  });

  it('Should parse Urls - with no urls', () => {
    const urls = processor(
      'Hello, you can reachout to me via or nas nas',
      'URLs (Extract All Matching URLs)'
    );
    if (Array.isArray(urls)) {
      expect(
        urls.length
      ).to.eq(0);
    }
  });
});
