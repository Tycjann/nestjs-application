/* eslint-disable @typescript-eslint/no-unused-vars */
// $ npm run migration: create--name = InitData
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Tags } from '../../products/db/tags.entity';
import { faker } from '@faker-js/faker';
import { UserAddress } from '../../users/db/user-address.entity';

export class InitData1666263416248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.saveTags();
    this.saveProducts(await this.saveTags());
    this.saveUsers();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async saveTags(): Promise<Tags[]> {
    const tagsArr: Tags[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];

    for (const tag of tags) {
      const tagToSave = new Tags();
      tagToSave.name = tag.name;
      tagsArr.push(await getRepository('Tag').save(tagToSave));
    }

    console.log('Tags insert');

    return tagsArr;
  }

  private getMultipleRandomTags = (array: Array<any>, number: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, number);
  };

  private async saveProducts(tags: Tags[]): Promise<void> {
    const products = [];
    for (let i = 0; i < 100; i++) {
      const product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(10, 100, 2),
        count: faker.finance.amount(10, 50, 0),
        tags: this.getMultipleRandomTags(tags, 2),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      products.push(product);
    }

    await getRepository('Product').save(products);
    console.log('Fake products insert');
  }

  private async saveUserAddress(): Promise<UserAddress[]> {
    const addressesArr: UserAddress[] = [];
    const userAddress = [];
    for (let i = 0; i < 10; i++) {
      const address = {
        country: faker.address.country(),
        city: faker.address.city(),
        street: faker.address.street(),
        houseNumber: faker.datatype.number(100),
        apartmentNumber: faker.datatype.number(100),
      };
      userAddress.push(address);

      for (const address of userAddress) {
        const addressToSave = new UserAddress();
        addressToSave.country = address.country;
        addressToSave.city = address.city;
        addressToSave.street = address.street;
        addressToSave.houseNumber = address.houseNumber;
        addressToSave.apartmentNumber = address.apartmentNumber;
        addressesArr.push(
          await getRepository('UserAddress').save(addressToSave),
        );
      }

      console.log('Fake UserAddress insert');
      return addressesArr;
    }
  }

  private async saveUsers(): Promise<void> {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const savedId = faker.datatype.uuid();

      const user = {
        id: savedId,
        nameFirst: faker.name.firstName(),
        nameLast: faker.name.lastName(),
        email: faker.internet.email(),
        dateBirth: faker.date.past(),
        role_: 'ADMIN',
        role: 'ADMIN',
        tags: this.getMultipleRandomTags(['CUSTOMER', 'SELLER', 'ADMIN'], 1),
        address: await this.saveUserAddress(),
      };
      users.push(user);
    }

    await getRepository('User').save(users);
    console.log('Users saved');
  }
}
