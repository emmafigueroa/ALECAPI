<template>
  <v-app>
    <v-card class="pa-12 round-lg" absolute color=" white--text" flat elevation="12" width="1400" height="650"> 
      <v-navigation-drawer
        absolute
        expand-on-hover
        color="grey darken-4"
        width="150"
        heigth="600"
        class="rounded-lg"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/women/85.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link >
            <v-list-item-content >
              <v-list-item-title class="text-h6 white--text" >
                ALEC
              </v-list-item-title >
              <v-list-item-subtitle class="white--text">API</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense class="white--text">
          <v-list-item   link :to="{path: '/'}">
            <v-list-item-icon >
              <v-icon class="white--text">mdi-{{ icons[0] }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Inicio</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{path: '/denuncias'}">
            <v-list-item-icon>
              <v-icon class="white--text">mdi-{{ icons[1] }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Denuncias</v-list-item-title>
          </v-list-item>
          
        </v-list>
      </v-navigation-drawer>
      <v-main >
        <v-container fluid rounded-lg>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>
      </v-main>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    icons: ["home", "account-eye"],
  }),
};
</script>
