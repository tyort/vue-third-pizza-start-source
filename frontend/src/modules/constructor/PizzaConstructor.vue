<template>
  <app-drop class="content__constructor" @drop="onDrop">
    <div class="pizza" :class="setSauceAndDough">
      <div class="pizza__wrapper">
        <transition-group name="scale">
          <div
            v-for="ingredient in ingredients"
            :key="ingredient.value"
            class="pizza__filling"
            :class="[
              `pizza__filling--${ingredient.value}`,
              { 'pizza__filling--second': ingredient.quantity == 2 },
              { 'pizza__filling--third': ingredient.quantity == 3 },
            ]"
          ></div>
        </transition-group>
      </div>
    </div>
  </app-drop>
</template>

<script setup>
import { computed } from "vue";
import AppDrop from "../../common/components/AddDrop.vue";

const props = defineProps({
  currentDough: {
    type: String,
    required: true,
  },
  currentSauce: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    default: () => [],
  },
  onDrop: {
    type: Function,
    required: true,
  },
});

const setSauceAndDough = computed(() => {
  switch (`${props.currentDough}${props.currentSauce}`) {
    case "largecreamy":
      return "pizza--foundation--big-creamy";
    case "largetomato":
      return "pizza--foundation--big-tomato";
    case "lightcreamy":
      return "pizza--foundation--small-creamy";
    default:
      return "pizza--foundation--small-tomato";
  }
});
</script>

<style lang="scss" scoped>
.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  $bl: &;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: inherit;
  }

  &--second {
    &::before {
      display: block;
      transform: rotate(45deg);
    }
  }

  &--third {
    &::before {
      display: block;
      transform: rotate(45deg);
    }
    &::after {
      display: block;
      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/ananas.svg");
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/bacon.svg");
  }

  &--blue_cheese,
  &--blue.pizza__filling--second::before,
  &--blue.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/blue_cheese.svg");
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/cheddar.svg");
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/chile.svg");
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/ham.svg");
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/jalapeno.svg");
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/mozzarella.svg");
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/mushrooms.svg");
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/olives.svg");
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/onion.svg");
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/parmesan.svg");
  }

  &--salami,
  &---salami.pizza__filling--second::before,
  &---salami.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/salami.svg");
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/salmon.svg");
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url("/api/public/img/filling-big/tomatoes.svg");
  }
}

.pizza {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--big-creamy {
    background-image: url("/api/public/img/foundation/big-creamy.svg");
  }

  &--foundation--big-tomato {
    background-image: url("/api/public/img/foundation/big-tomato.svg");
  }

  &--foundation--small-creamy {
    background-image: url("/api/public/img/foundation/small-creamy.svg");
  }

  &--foundation--small-tomato {
    background-image: url("/api/public/img/foundation/small-tomato.svg");
  }
}
</style>
