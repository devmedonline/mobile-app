import { Post } from '@/types/post/post';
import { yolo } from '@/utils/yolo';

export type GetPostByIdParams = { id: string };

const content = `{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","marks":[{"type":"textStyle"}],"text":"Ingerir uma lâmpada pode ter consequências graves para a saúde. As lâmpadas contêm "},{"type":"text","marks":[{"type":"textStyle"},{"type":"bold"}],"text":"materiais tóxicos, como mercúrio e chumbo"},{"type":"text","marks":[{"type":"textStyle"}],"text":", que podem causar danos ao sistema digestivo e nervoso. Além disso, a quebra da lâmpada dentro do corpo pode levar a cortes internos, infecções e até mesmo perfuração de órgãos. É crucial manter as lâmpadas fora do alcance de crianças e animais de estimação, e descartá-las corretamente em locais apropriados."}]},{"type":"image","attrs":{"src":"https://images.unsplash.com/photo-1508705854614-be8c5cfdf17e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","alt":"imagem qualquer","title":null}},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","marks":[{"type":"textStyle"}],"text":"Embora ingerir uma lâmpada e um tênis sejam situações extremamente diferentes, ambos representam "},{"type":"text","marks":[{"type":"textStyle"},{"type":"bold"}],"text":"perigos significativos para a saúde"},{"type":"text","marks":[{"type":"textStyle"}],"text":". Tanto a lâmpada quanto o tênis podem causar obstrução no sistema digestivo, resultando em sérios danos internos. Além disso, ambos podem levar a complicações graves que requerem intervenção médica imediata. É importante manter objetos não comestíveis fora do alcance e da vista de crianças e animais de estimação, garantindo a segurança de todos."}]},{"type":"orderedList","attrs":{"start":1},"content":[{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Obstrução no sistema digestivo: Ambos os objetos podem ficar presos no sistema digestivo, causando obstrução e bloqueando o fluxo normal dos alimentos."}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Danos aos órgãos internos: A ingestão de objetos não comestíveis pode levar a danos nos órgãos internos, como perfuração intestinal, o que pode ser fatal se não tratado rapidamente."}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Ferimentos na boca, garganta e esôfago: Ao engolir objetos grandes ou pontiagudos, como partes de uma lâmpada quebrada ou componentes de um tênis, pode haver ferimentos nessas áreas."}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Intoxicação: No caso de uma lâmpada, a ingestão de substâncias tóxicas, como mercúrio, pode causar intoxicação e danos aos sistemas nervoso e renal."}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Infecções: A quebra de uma lâmpada ou partes de um tênis dentro do corpo pode levar a infecções graves se não forem removidas adequadamente."}]}]},{"type":"listItem","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Problemas respiratórios: Se um objeto como uma lâmpada for aspirado em vez de engolido, pode causar problemas respiratórios sérios ou até mesmo asfixia."}]}]}]},{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"Esses são alguns dos problemas."}]},{"type":"blockquote","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","marks":[{"type":"textStyle"}],"text":"Assim como a mente requer luz para iluminar o caminho do conhecimento, o corpo requer alimentos saudáveis para nutrir a alma. Comer uma lâmpada, além de ser um erro da mais profunda escuridão, é mergulhar no abismo da ignorância e da destruição. - Aristóteles"}]}]}]}`;

const FAKE_POST_LIST: Post[] = yolo.range(10, 20).map((i) => ({
  id: i,
  title: yolo.faker.lorem.words(6),
  author: {
    id: i,
    name: yolo.faker.person.fullName(),
    avatar: yolo.faker.image.avatar(),
    createdAt: yolo.faker.date.past(),
    email: yolo.faker.internet.email(),
  },
  createdAt: yolo.faker.date.past(),
  locale: 'pt-br',
  readingTime: yolo.randomInt(5, 25),
  thumbnail: yolo.faker.image.urlPicsumPhotos({ width: 640, height: 360 }),
  updatedAt: yolo.faker.date.recent(),
  content: content,
  tags: yolo.faker.lorem.words(5).split(' '),
}));

export async function getPostById({ id }: GetPostByIdParams): Promise<Post> {
  await yolo.sleep(1000);
  yolo.randomlyThrowError(0.25);

  const post = FAKE_POST_LIST.find((post) => post.id === Number(id));

  if (!post) {
    throw new Error('Post not found');
  }

  return post;
}
