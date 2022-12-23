export default class HhApi {
  static baseUrl = 'https://api.hh.ru';

  async getVacancies(text) {
    const url = `${HhApi.baseUrl}/vacancies?text=${text}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error('Error on request');

    const data = await res.json();

    const cardsData = [];

    data.items.forEach((data) => {
      const link = data.alternate_url;
      const logo = data.employer.logo_urls?.['90'];
      const company = data.employer.name;
      const name = data.name;
      const city = data.address?.city;

      cardsData.push({
        link,
        logo,
        company,
        name,
        city,
      });
    });

    return cardsData;
  }

  getSuggests(text) {
    const url = `${HhApi.baseUrl}/suggests/vacancy_search_keyword?text=${text}`;

    return fetch(url).then((res) => {
      if (res.ok) return res.json();
      throw new Error('Error on request');
    });
  }
}
