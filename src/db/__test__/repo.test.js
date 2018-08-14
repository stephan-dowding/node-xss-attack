import {init, addComment, getComments} from '../repo';

describe("#repo", () => {
  beforeEach(async () => {
    await init();
  });

  test("Store and return comment", async () => {
    await addComment('this is a comment');
    const comments = await getComments();
    expect(comments[0].comment).toEqual('this is a comment');
  });

  test("returns comments in order", async () => {
    await addComment('one');
    await addComment('two');
    await addComment('three');
    await addComment('four');
    const comments = await getComments();
    expect(comments[0].comment).toEqual('one');
    expect(comments[1].comment).toEqual('two');
    expect(comments[2].comment).toEqual('three');
    expect(comments[3].comment).toEqual('four');
  });
});
