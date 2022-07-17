import { debounce } from "../views/Slider";

jest.setTimeout(30000);
describe('debounce()', () => {
  const func = jest.fn((values, handle) => {return});
  const debouncedFunc = debounce(func, 1000);

  it('should not be called right after calling', () => {
    debouncedFunc([], 0);
    expect(func).toHaveBeenCalledTimes(0);
  })

  it('should not be called before the end of timer', async () => {
    for (let i = 0; i < 10; i++) {
      await new Promise((res) => {
        setTimeout(() => {
          res(0);
        }, 500);
      });
      debouncedFunc([], 0);
    }
    expect(func).toHaveBeenCalledTimes(0);
  })

  it('should be called ', async () => {    
    debouncedFunc([], 0);
    await new Promise((res) => {
      setTimeout(() => {
        res(0);
      }, 2000);
    });       
    expect(func).toHaveBeenCalledTimes(1);
  })
})