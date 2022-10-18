const bcrypt = require('bcrypt');
const {
  Countrie,
  UserType,
  Gender,
  User,
  ParticipantStatus,
  EventStatus,
  Event,
  EventOption,
  ApartsType,
  Apart,
  Participant,
  Comment,
} = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Countries', [
        {
          country: 'Россия',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          country: 'Армения',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    ),
    await queryInterface.bulkInsert(
      'UserTypes', [
        {
          type: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'moderator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    ),
    await queryInterface.bulkInsert(
      'Genders', [
        {
          gender: 'женский',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gender: 'мужской',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    ),
    await queryInterface.bulkInsert(
      'Users', [
        {
          password: await bcrypt.hash('admin', 10),
          email: 'a1evtina@list.ru',
          userTypeId: 1,
          firstName: 'Алевтина',
          lastName: 'Грейнджер',
          photo: 'images/alevtina_img.jpg',
          profession: 'fullstack',
          birthday: new Date(1993, 06, 14),
          genderId: 1,
          countryId: 1,
          city: 'Spb',
          interests: 'люблю свою команду, пикниики со своей командой, кодить со своей командой и вообще люблю свою команду',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password: await bcrypt.hash('admin', 10),
          email: 'nikita@mail.ru',
          userTypeId: 1,
          firstName: 'Никита',
          lastName: 'Поттер',
          photo: 'images/nikita.jpg',
          profession: 'fullstack',
          birthday: new Date(1992, 10, 22),
          genderId: 2,
          countryId: 2,
          city: 'SPb',
          interests: 'кодить, фиксить ошибки Алевтины, унижать Алевтину и потом жалеть ее',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password: await bcrypt.hash('admin', 10),
          email: 'igor@mail.ru',
          userTypeId: 1,
          firstName: 'Игорон',
          lastName: 'Уизли',
          photo: 'images/igor.jpg',
          profession: 'fullstack',
          birthday: new Date(1992, 10, 22),
          genderId: 2,
          countryId: 2,
          city: 'SPb',
          interests: 'люблю несмешные шутки, смешные шутки и еще люблю давать переменным смешные имена',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password: await bcrypt.hash('admin', 10),
          email: 'baga@mail.ru',
          userTypeId: 1,
          firstName: 'Бага',
          lastName: 'Дамблдор',
          photo: 'images/baga.jpeg',
          profession: 'fullstack волшебник',
          birthday: new Date(1992, 10, 22),
          genderId: 2,
          countryId: 1,
          city: 'Санкт-Петербург',
          interests: 'люблю Дагестан, охотиться на фантастических тварей и играть в мафию',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password: await bcrypt.hash('admin', 10),
          email: 'kj@mail.ru',
          userTypeId: 1,
          firstName: 'Каджик',
          lastName: 'Хагрид',
          photo: 'images/kj_img.jpeg',
          profession: 'fullstack',
          birthday: new Date(1992, 10, 22),
          genderId: 2,
          countryId: 1,
          city: 'SPb',
          interests: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    ),
    await queryInterface.bulkInsert(
      'ParticipantStatuses', [
        {
          title: 'не участвует',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'участвует',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'голосовал',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'отказался',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'оплатил',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    ),
    await queryInterface.bulkInsert(
      'EventStatuses', [
        {
          title: 'предложено',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'организация',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'отменено',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'проведено',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    ),
    await queryInterface.bulkInsert(
      'Events', [
        {
          userId: 1,
          startDate: new Date(2022, 09, 17),
          endDate: new Date(2022, 09, 25),
          maxParticipants: 30,
          eventTitle: 'Удаленка с фантастическими тварями',
          description: 'Вы устали от рутины, маглов и их тупости? Едем работать в заповедные леса, в свободное время будем общаться с фантастическими тварями, пить сливочное пиво и летать на метлах',
          statusId: 2,
          budget: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
          round: 1,
        },
        {
          userId: 2,
          startDate: new Date(2022, 12, 15),
          endDate: new Date(2022, 12, 25),
          maxParticipants: 20,
          eventTitle: 'Коворкинг волшебников на Килиманджаро',
          description: 'Собираем немаглов из Питера для поездки в горы. Говорят, там много симпатичных ведьм, будет весело, особенно если .',
          statusId: 1,
          budget: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
          round: 1,
        }
      ]
    ),
    await queryInterface.bulkInsert(
      'EventOptions', [
        {
          photo: 'https://s1.1zoom.ru/big0/506/Fantastic_world_Forests_471858.jpg',
          countryId: 1,
          title: 'Лес Джуманджи',
          description: 'В джуманджи водятся дикие джуны.',
          eventId: 1,
          votes: 0,
          winner: false,
          budget: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://i.artfile.ru/1920x1080_532381_[www.ArtFile.ru].jpg',
          countryId: 1,
          title: 'Заповедник айтишников',
          description: 'Здесь водятся представители одной из древнейших профессий на земле. Опасайтесь подвидов Лехи и Артемы, могут задушить',
          eventId: 1,
          votes: 0,
          winner: false,
          budget: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/art/81/14975-1000x830.jpg',
          countryId: 1,
          title: 'Эльбрус - просто волшебное место',
          description: 'Все виды фантастических тварей в одном месте, все они разговаривают',
          eventId: 1,
          votes: 0,
          winner: false,
          budget: 35,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://demiart.ru/forum/uploads12/post-2340957-1373282983.jpg',
          countryId: 1,
          title: 'Поселение Ани',
          description: 'Вотчина фей',
          eventId: 2,
          votes: 0,
          winner: false,
          budget: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://img3.goodfon.ru/original/1400x1050/c/87/noch-gory-zamok-bashni-volk.jpg',
          countryId: 1,
          title: 'Поселение Темы',
          description: 'Мрачная сторона, тут господствует черная магия',
          eventId: 2,
          votes: 0,
          winner: false,
          budget: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://img3.akspic.ru/attachments/crops/3/8/7/4/54783/54783-oblako-shahmatnaya_doska-priroda-shahmatnaya_figura-mir-1920x1080.jpg',
          countryId: 1,
          title: 'Поселение Лехи',
          description: 'Из развлечений в окрестностях - шахматы и жесткие код-ревью',
          eventId: 2,
          votes: 0,
          winner: false,
          budget: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    ),
    await queryInterface.bulkInsert(
      'ApartsTypes', [
        {
          photo: 'https://img.freepik.com/premium-photo/fairy-tale-magical-witch-house-glowing-wooden-doors-and-windows-witch-hunt-in-the-forest-illustration-for-a-book-of-fairy-tales_86390-7496.jpg',
          title: 'Скромный домик в лесу',
          description: '20 спален и 30 ванных комнат. Для поездки на неделю приемлемые условия, цена средняя',
          eventId: 1,
          votes: 5,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://pw.artfile.me/wallpaper/01-04-2017/650x459/goroda---dvorcy--zamki--kreposti-zamok-l-1147036.jpg',
          title: 'Скромный дворец в лесу',
          description: 'Коворкинг вдали от городского шума',
          eventId: 1,
          votes: 8,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://porusski.me/wp-content/uploads/2019/08/179812678-1-800x534.jpg',
          title: 'Люкс-палатки',
          description: 'Палатки в лесу',
          eventId: 1,
          votes: 10,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://img.freepik.com/premium-photo/fairy-tale-magical-witch-house-glowing-wooden-doors-and-windows-witch-hunt-in-the-forest-illustration-for-a-book-of-fairy-tales_86390-7496.jpg',
          title: 'Скромный домик в лесу',
          description: '20 спален и 30 ванных комнат. Для поездки на неделю приемлемые условия, цена средняя',
          eventId: 2,
          votes: 5,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://pw.artfile.me/wallpaper/01-04-2017/650x459/goroda---dvorcy--zamki--kreposti-zamok-l-1147036.jpg',
          title: 'Скромный дворец в лесу',
          description: 'Коворкинг вдали от городского шума',
          eventId: 2,
          votes: 8,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://porusski.me/wp-content/uploads/2019/08/179812678-1-800x534.jpg',
          title: 'Люкс-палатки',
          description: 'Палатки в лесу',
          eventId: 2,
          votes: 10,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    ),
    await queryInterface.bulkInsert(
      'Aparts', [
        {
          photo: 'https://hotelawards.ru/img/upload/11475ae1ab89d07fe00a6e5674951700.jpg',
          title: 'Палаточный лагерь на берегу реки',
          type: 'палатки',
          description: 'Ультраскоростной интернет, рыбалка с русалками по вечерам',
          budget: '2000',
          eventId: 1,
          votes: 1,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://static.tildacdn.com/tild6561-3163-4861-b362-323137376164/_4.jpg',
          title: 'Домики с джакузи, ',
          type: 'палатки',
          description: 'Доставка еды голубями включена в стоимость проживания',
          budget: '4000',
          eventId: 1,
          votes: 12,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://www.russiadiscovery.ru/upload/files/files/2%20%D0%B3%D0%BB%D1%8D%D0%BC%D0%BF%D0%B8%D0%BD%D0%B3.png',
          title: 'Палатки с панорамным видом',
          type: 'палатки',
          description: 'Выход через крышу на метле и телепорт через камин',
          budget: '5000',
          eventId: 1,
          votes: 4,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://hotelawards.ru/img/upload/11475ae1ab89d07fe00a6e5674951700.jpg',
          title: 'Палаточный лагерь на берегу реки',
          type: 'палатки',
          description: 'Ультраскоростной интернет, рыбалка с русалками по вечерам',
          budget: '2000',
          eventId: 2,
          votes: 1,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://static.tildacdn.com/tild6561-3163-4861-b362-323137376164/_4.jpg',
          title: 'Домики с джакузи, ',
          type: 'палатки',
          description: 'Доставка еды голубями включена в стоимость проживания',
          budget: '4000',
          eventId: 2,
          votes: 12,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://www.russiadiscovery.ru/upload/files/files/2%20%D0%B3%D0%BB%D1%8D%D0%BC%D0%BF%D0%B8%D0%BD%D0%B3.png',
          title: 'Палатки с панорамным видом',
          type: 'палатки',
          description: 'Выход через крышу на метле и телепорт через камин',
          budget: '5000',
          eventId: 2,
          votes: 4,
          winner: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    ),
    await queryInterface.bulkInsert(
      'Participants', [
        {
          eventId: 1,
          userId: 1,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventId: 2,
          userId: 2,
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventId: 1,
          userId: 3,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventId: 2,
          userId: 4,
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          eventId: 2,
          userId: 5,
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    ),
    
    await queryInterface.bulkInsert(
      'Comments', [
        {
          userId: 2,
          description: 'Всем йоу, планирую лететь на метле из питера, возьму попутчиков',
          eventId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          description: 'Кто не сдал деньги на выпускной - у вас еще есть шанс',
          eventId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
