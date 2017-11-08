<template>
    <v-container fluid >
      <v-flex d-flex xs12>
        <v-layout row>
          <p>{{ ratedUsers }}</p>
        </v-layout>
      </v-flex>
  </v-container>
</template>

<script>

module.exports = {
    data: function(){
        return{
            team:{
              name: 'Thunder',
              members: [
                {
                  _id: 1,
                  name: 'Ben',
                  users: [1, 2]
                },
                {
                  _id: 2,
                  name: 'Tracy',
                  users: [3, 4]
                }

              ]

            },
            users:[
              {
                _id: 1,
                login: 'tdm1'
              },
              {
                _id: 2,
                login: 'tdm2'
              },
              {
                _id: 3,
                login: 'tdm3'
              },
              {
                _id: 4,
                login: 'tdm4'
              },
               {
                _id: 5,
                login: 'tdm5'
              },
              {
                _id: 6,
                login: 'tdm6'
              },
              {
                _id: 7,
                login: 'tdm7'
              },
              {
                _id: 8,
                login: 'tdm8'
              },
               {
                _id: 9,
                login: 'tdm9'
              }

            ],
            ratings:[
              {
                _id: 1,
                user_origin: 1,
                user_rating: 5,
                rating: 3
              },
              {
                _id: 2,
                user_origin: 1,
                user_rating: 6,
                rating: 3
              },
              {
                _id: 3,
                user_origin: 1,
                user_rating: 7,
                rating: 3
              },
              {
                _id: 4,
                user_origin: 1,
                user_rating: 8,
                rating: 5
              },
              {
                _id: 5,
                user_origin: 1,
                user_rating: 9,
                rating: 3
              },
              {
                _id: 6,
                user_origin: 2,
                user_rating: 5,
                rating: 1
              },
              {
                _id: 7,
                user_origin: 2,
                user_rating: 6,
                rating: 1
              },
              {
                _id: 8,
                user_origin: 2,
                user_rating: 7,
                rating: 3
              },
              {
                _id: 9,
                user_origin: 2,
                user_rating: 8,
                rating: 4
              },
              {
                _id: 10,
                user_origin: 2,
                user_rating: 9,
                rating: 1
              },
              
            ]
        }
    },
  
    computed:{
      
      ratedRatingsLookUp: function(){
        var lookup = {};
        this.ratings.forEach(function(r){
          lookup[r.user_rating] = r;
        });
        return lookup;
      },
      
      ratedUsers: function(){
        var self = this;
        var list = self.users.filter(function(user){
          console.log(self.ratedRatingsLookUp[user._id]);
          return self.ratedRatingsLookUp[user._id] != null;
        });
        
        list.forEach(function(ratedUser){
          self.ratings.forEach(function(rating){
            if (rating.user_rating == ratedUser._id){
              if (ratedUser.ratings){
                ratedUser.ratings.push(rating.rating);
              } else ratedUser.ratings = [rating.rating];
            }
          });
        });
      
        return list;
      },
      
      
    }


}
</script>