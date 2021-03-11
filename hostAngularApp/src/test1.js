
      const el = document.querySelector('test-card');
      el.addEventListener('likeNotify', event => {
        console.log(`${event.detail}`);
      });
      el.addEventListener('shareNotify', e => {
        console.log(`${event.detail}`);
      });
      el.addEventListener('commentNotify', e => {
        console.log(`${event.detail}`);
      });
 
      function btnClick() {
        el.setAttribute('title', 'abc')
      }