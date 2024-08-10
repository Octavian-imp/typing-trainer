export const controlText =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit Curabitur ullamcorper diam eget augue dictum convallis Nulla volutpat non mi efficitur semper Phasellus bibendum fermentum eros vel faucibus Praesent placerat et elit sed interdum Praesent a dui est Integer ligula enim, pellentesque at aliquet a feugiat sed libero Nullam vitae augue faucibus volutpat odio non scelerisque sapien Donec pharetra est sed malesuada porttitor risus risus scelerisque dui ut condimentum est magna quis lorem Donec a elementum leo et auctor massa Proin fringilla rhoncus tellus et pretium ipsum facilisis in Maecenas scelerisque eleifend tortor at accumsan Quisque placerat viverra justo Sed convallis quam nec dignissim interdum tellus nunc hendrerit leo sed bibendum justo libero vel turpis In hendrerit pellentesque efficitur Quisque commodo eleifend arcu nec euismod mi elementum a Curabitur et sapien hendrerit scelerisque massa sed blandit quam Donec vehicula magna sed ultricies pulvinar libero sapien porttitor enim a vestibulum est lacus vel magna".replace(
    /[\W\s]/g,
    " "
  );

export const controlWordsForText = controlText
  .split(" ")
  .map((word, index) => ({ key: word + index, value: word }));
