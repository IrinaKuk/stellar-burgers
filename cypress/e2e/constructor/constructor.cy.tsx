describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('http://localhost:4000');
  });
});

describe('Функциональность конструктора бургеров', () => {
  const ingredientsFixture = '/mocks/ingredients.json';
  const userFixture = '/mocks/user.json';
  const orderFixture = '/mocks/order.json';

  const modalContent = `[data-cy=${'modal_content'}]`;
  const topBunInConstructor = `[data-cy=${'section_constructor_element_top_bun'}]`;
  const bottomBunInConstructor = `[data-cy=${'section_constructor_element_bottom_bun'}]`;
  const sauceInConstructor = `[data-cy=${'section_constructor_element_sauce'}]`;
  const mainInConstructor = `[data-cy=${'section_constructor_element_main'}]`;

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: ingredientsFixture }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/auth/login', { fixture: userFixture }).as(
      'postLogin'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: userFixture }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: orderFixture }).as(
      'postOrder'
    );

    cy.visit('/');

    cy.get(`[data-cy=${'section_ingredients_bun'}]`)
      .first()
      .find('button')
      .as('buttonAddBun');
    cy.get(`[data-cy=${'section_ingredients_sauce'}]`)
      .first()
      .find('button')
      .as('buttonAddSauce');
    cy.get(`[data-cy=${'section_ingredients_main'}]`)
      .first()
      .find('button')
      .as('buttonAddMain');
    cy.get(`[data-cy=${'section_ingredients_bun'}]`)
      .first()
      .find('a')
      .as('openIngredientModal');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление булки в конструктор', () => {
      cy.get('@buttonAddBun').click();
      cy.get(topBunInConstructor).should('exist');
      cy.get(bottomBunInConstructor).should('exist');
    });

    it('Добавление соуса в конструктор', () => {
      cy.get('@buttonAddSauce').click();
      cy.get(sauceInConstructor).should('exist');
    });

    it('Добавление основного ингредиента в конструктор', () => {
      cy.get('@buttonAddMain').click();
      cy.get(mainInConstructor).should('exist');
    });
  });

  describe('Функциональность модального окна', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.get(modalContent).should('not.exist');
      cy.get('@openIngredientModal').click();
      cy.get(modalContent).should('exist');

      cy.get('@getIngredients').then((interception) => {
        const ingredients = interception.response.body.data;
        const firstIngredient = ingredients[0];
        cy.get('#modals').find('h3').should('contain', firstIngredient.name);
      });
    });

    it('Закрытие модального окна по клику на кнопку закрытия', () => {
      cy.get('@openIngredientModal').click();
      cy.get(modalContent).should('exist');
      cy.get('#modals').find('button').click();
      cy.get(modalContent).should('not.exist');
    });

    it('Закрытие модального окна по клику на оверлей', () => {
      cy.get('@openIngredientModal').click();
      cy.get(modalContent).should('exist');
      cy.get(`[data-cy=${'modal_overlay'}]`).click({ force: true });
      cy.get(modalContent).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    
    it('Создание заказа', () => {
      window.localStorage.setItem('refreshToken', 'someValueRefreshToken');
      cy.setCookie('accessToken', 'someValueAccessToken');
      cy.visit('/');
      window.localStorage.setItem('refreshToken', 'someValueRefreshToken');
      cy.setCookie('accessToken', 'someValueAccessToken');
      cy.get('@buttonAddBun').click();
      cy.get('@buttonAddSauce').click();
      cy.get('@buttonAddMain').click();

      cy.get(`[data-cy=${'order_button'}]`).click();
      cy.get(modalContent).should('exist');
      cy.get('@postOrder').then((interception) => {
        const order = interception.response.body.order;
        cy.get('#modals').find('h2').should('contain', order.number);
      });

      cy.get('#modals').find('button').click();
      cy.get(modalContent).should('not.exist');
      cy.get(topBunInConstructor).should('not.exist');
      cy.get(bottomBunInConstructor).should('not.exist');
      cy.get(sauceInConstructor).should('not.exist');
      cy.get(mainInConstructor).should('not.exist');
      window.localStorage.clear();
      cy.clearAllCookies();
  });
  });
});
