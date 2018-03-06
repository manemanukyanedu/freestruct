<template>
  <div>
    <div class="types">
        <div ><router-link to="/students">For Students</router-link></div>
        <div ><router-link to="/tutors">For Tutors</router-link></div>
      </div>
    <div class="blog">
      <h3>Lorem ipsum dolor</h3>
      <p>Lorem ipsum dolor sit amet, duo quas lorem numquam no, deseruisse referrentur te usu. Corpora invidunt pro ei, cu sed iuvaret iracundia. Mea erant ceteros temporibus eu, id minim patrioque conceptam per. Ut simul conclusionemque vix, ei cum etiam dolor dissentiunt. Duo consul mnesarchum ea.</p>
      <hr>
    </div>
    <div class="blog">
      <h3>Lorem ipsum dolor</h3>
      <p>Lorem ipsum dolor sit amet, duo quas lorem numquam no, deseruisse referrentur te usu. Corpora invidunt pro ei, cu sed iuvaret iracundia. Mea erant ceteros temporibus eu, id minim patrioque conceptam per. Ut simul conclusionemque vix, ei cum etiam dolor dissentiunt. Duo consul mnesarchum ea.</p>
      <hr>
    </div>
    <div class="blog">
      <h3>Lorem ipsum dolor</h3>
      <p>Lorem ipsum dolor sit amet, duo quas lorem numquam no, deseruisse referrentur te usu. Corpora invidunt pro ei, cu sed iuvaret iracundia. Mea erant ceteros temporibus eu, id minim patrioque conceptam per. Ut simul conclusionemque vix, ei cum etiam dolor dissentiunt. Duo consul mnesarchum ea.</p>
      <hr>
    </div>
    <div class="blog">
      <h3>Lorem ipsum dolor</h3>
      <p>Lorem ipsum dolor sit amet, duo quas lorem numquam no, deseruisse referrentur te usu. Corpora invidunt pro ei, cu sed iuvaret iracundia. Mea erant ceteros temporibus eu, id minim patrioque conceptam per. Ut simul conclusionemque vix, ei cum etiam dolor dissentiunt. Duo consul mnesarchum ea.</p>
      <hr>
    </div>
</div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style scoped lang="less">
  h1, h2 {
    font-weight: normal;
  }
.types {
    display: flex;
    justify-content: center;
    background-color: #e1e2e2b0;
    margin-top: 11rem;
  }
 .types div {
    width: 50%;
    max-width: 20rem;
    a, a:visited, a:focus {
      display: block;
      width: 100%;
      text-align: center;
      line-height: 5rem;
      font-size: 2rem;
      padding: 4rem;
      color: #343535fc;
      text-decoration: none;
    }
  }
  .types div:first-child {
    border-right: .1rem solid  #b5b5b5;
  }
  .blog {
    background-color: white;
    padding: 2rem;
    color: #343535de;
  }
  .blog p {
        max-width: 56rem;
    margin: 0 auto;
    padding: 1rem 2rem;
  }
  .blog hr {
    width: 40%;
    height: .05rem;
    border: none;
    background: #75737363;
  }

</style>
