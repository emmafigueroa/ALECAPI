

<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Formulario de EDICIÓN</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>

        <form class="mb-4" v-on:submit.prevent="guardarDenuncia()" >

          <v-text-field 
            v-model="denuncia.servidor_denunciado"
            label="Persona Denunciada"
            outlined
            required
          ></v-text-field>

           <v-text-field
            v-model="denuncia.entidad_perteneciente"
            label="Intitución Perteneciente"
            outlined
            required
          ></v-text-field>

            <v-text-field
            v-model="denuncia.lugar_echos"
            label="Lugar de los Echos"
            outlined
            required
          ></v-text-field>

           <v-text-field
            v-model="denuncia.descripcion_evento"
            label="Descripcion del Evento"
            outlined
            required
          ></v-text-field>
          
          

          <v-card-actions>
            <v-btn color="warning" class="mr-4" type="submit">Guardar</v-btn>
          </v-card-actions>
        </form>

      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios'
export default {
    name:'editarDenuncia',

    mounted(){
      this.id = this.$route.params.id
      console.log(this.$route)
      axios.get('http://localhost/ApiCon/index.php?id_denuncia='+this.id)
      .then(r =>{
        this.denuncia = r.data
      })
      .catch(function(error){
        console.log(error)
      })
    },
    data(){
      return{
        id:null,
        denuncia:{
          servidor_denunciado:'',
          entidad_perteneciente:'',
          lugar_echos:'',
          descripcion_evento:''  
        }
      }
    },
    methods:{
      guardarDenuncia(){
        var router =  this.$router;
        axios.put('http://localhost/ApiCon/index.php?id_denuncia='+this.id+
        '&servidor_denunciado='+this.denuncia.servidor_denunciado+
        '&entidad_perteneciente='+this.denuncia.entidad_perteneciente+
        '&lugar_echos='+this.denuncia.lugar_echos+
        '&descripcion_evento='+this.denuncia.descripcion_evento)
        .then(function(){
           router.push('/denuncias')
        })
        .catch(function(error){
        console.log(error)
        })
      }
    }
}
</script>