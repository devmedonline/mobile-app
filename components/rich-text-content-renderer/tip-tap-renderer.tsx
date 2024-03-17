import {
  NodeHandler,
  NodeHandlers,
  TipTapRender,
} from '@troop.com/tiptap-react-render';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TextStyle, View } from 'react-native';

const Doc: NodeHandler = ({ children }) => <>{children}</>;

const Paragraph: NodeHandler = ({ children }) => {
  const content = React.Children.toArray(children);
  return (
    <Text
      selectable
      style={{
        textAlign: 'left',
        marginBottom: 10,
        lineHeight: 20,
        fontSize: 16,
      }}
    >
      {content.length ? children : '\n'}
    </Text>
  );
};

const TextNode: NodeHandler = ({ node }) => {
  const { marks, text } = node;

  const textStyle: TextStyle = {
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecorationLine: 'none',
    color: 'black',
  };

  if (marks) {
    marks.forEach((mark) => {
      if (mark.type === 'bold') {
        textStyle.fontWeight = 'bold';
      }
      if (mark.type === 'italic') {
        textStyle.fontStyle = 'italic';
      }
      if (mark.type === 'underline') {
        textStyle.textDecorationLine = 'underline';
      }
      if (mark.type === 'strike') {
        textStyle.textDecorationLine = 'line-through';
      }
    });
  }

  return <Text style={textStyle}>{text}</Text>;
};

const OrderedList: NodeHandler = ({ children }) => {
  const listItems = React.Children.map(children, (child, index) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>{`${index + 1}.`}</Text>
        <View style={{ flex: 1 }}>{child}</View>
      </View>
    );
  });

  return (
    <View
      style={{
        marginLeft: 10,
      }}
    >
      {listItems}
    </View>
  );
};

const ListItem: NodeHandler = ({ children }) => <View>{children}</View>;

const Img: NodeHandler = (props) => {
  const { src, alt, title } = props.node;
  return (
    <Image
      className="w-full h-64 object-cover rounded-lg shadow-md"
      source={{ uri: src }}
      contentFit="cover"
      alt={alt}
      accessibilityLabel={title}
      transition={1000}
    />
  );
};

const Blockquote: NodeHandler = ({ children }) => {
  return (
    <View
      style={{
        borderLeftWidth: 2,
        borderLeftColor: 'black',
        paddingLeft: 5,
        marginLeft: 10,
      }}
    >
      {children}
    </View>
  );
};

const handlers: NodeHandlers = {
  doc: Doc,
  text: TextNode,
  paragraph: Paragraph,
  orderedList: OrderedList,
  listItem: ListItem,
  image: Img,
  blockquote: Blockquote,
};

type RichTextContentRendererProps = {
  data: string;
};

function InnerRichTextContentRenderer({ data }: RichTextContentRendererProps) {
  const asNode = JSON.parse(data);
  return <TipTapRender handlers={handlers} node={asNode} />;
}

export const RichTextContentRenderer = React.memo(InnerRichTextContentRenderer);
