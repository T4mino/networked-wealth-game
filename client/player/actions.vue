<template>
  <div>
    <h2 v-if="currentGame">
      Round {{ currentGame.round }}
    </h2>

    <div class="alert alert-info">
      <h3 v-if="myNode">Your wealth: <span class="label label-primary">{{ myNode.value }}</span></h3>

      <h3 v-if="myNode">You have <span class="label label-success">{{ myNode.endowment || "nothing" }}</span> to give.</h3>
    </div>

    <div class="well" v-if="selectedNode">
      <div v-if="selectedPlayer == myPlayer">
        <h3>This is you.</h3>
		<h3>Your gender: <span class="label label-default">{{ myNode.discriminator.gender.label }}</span></h3>
		<h3>Your age: <span class="label label-default">{{ myNode.discriminator.age.label }}</span></h3>
		<div v-if="currentGame.round == 0">
			<!-- TODO: use /imports/config.js -->
			<form>
				<h3><label>Your gender:</label></h3>
				<div>
					<label class="form-check-label" for="selectGenderFemale">
						<input class="form-check-input" type="radio" name="selectGender" id="selectGenderFemale" value="Female" v-on:input="changeOwnGender"> Female
					</label>
				</div>
				<div>
					<label class="form-check-label" for="selectGenderMale">
						<input class="form-check-input" type="radio" name="selectGender" id="selectGenderMale" value="Male" v-on:input="changeOwnGender"> Male
					</label>
				</div>
				<div>
					<label class="form-check-label" for="selectGenderOther">
						<input class="form-check-input" type="radio" name="selectGender" id="selectGenderOther" value="Other" v-on:input="changeOwnGender"> Other
					</label>
				</div>
				<h3><label for="selectAge">Your age:</label></h3><!-- v-model="myNode.discriminator.age.label" -->
				<select class="form-control" id="selectAge" v-on:input="changeOwnAge">
					<option value="" selected disabled>Select...</option>
					<option value="<= 20">&le; 20</option>
					<option value="20 - 25">20 - 25</option>
					<option value=">= 25">&ge; 25</option>
				</select>
			</form>
		</div>
      </div>
      <div v-else>
        <h3>Anonymous {{ selectedNode.label }}</h3>
        <h3 v-if="currentGame.wealthVisible || !myNode">
          Their wealth: <span class="label label-default">{{selectedNode.value}}</span>
          </h3>
		<h3>Their gender: <span class="label label-default">{{selectedNode.discriminator.gender.label}}</span></h3>
		<h3>Their age: <span class="label label-default">{{selectedNode.discriminator.age.label}}</span></h3>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: [ 'myPlayer', 'selectedPlayer' ],
  data: function() {
    return {
      myNode: null,
      selectedNode: null,
      currentGame: null
    }
  },
  meteor: {
    selectedNode: {
      params() {
        return {
          id: this.selectedPlayer
        };
      },
      update({id}) {
        return Nodes.findOne(id);
      }
    },
    myNode: {
      params() {
        return {
          id: this.myPlayer
        };
      },
      update({id}) {
        return Nodes.findOne(id);
      }
    },
    $subscribe: {
      'game': function() {
        return [ false ]; // Just get the active game
      }
    },
    currentGame() {
      return Games.findOne({active: true});
    }
  },
  methods: {
    changeOwnAge: function(node) {
	  var e = document.getElementById("selectAge");
      var newAge = e.options[e.selectedIndex].value;
	  Nodes.update(this.myPlayer, { value: Nodes.findOne(this.myPlayer).value, label: Nodes.findOne(this.myPlayer).label, discriminator: {
	    "gender": {
		  "label": Nodes.findOne(this.myPlayer).discriminator.gender.label,
		  "color": Nodes.findOne(this.myPlayer).discriminator.gender.color
		},
		"age": {
		  "label": newAge
		}
	    }}
	  );
    },
    changeOwnGender: function(node) {
      var newGender = document.querySelector('input[name="selectGender"]:checked').value;
	  Nodes.update(this.myPlayer, { value: Nodes.findOne(this.myPlayer).value, label: Nodes.findOne(this.myPlayer).label, discriminator: {
	    "gender": {
		  "label": newGender,
		  "color": Nodes.findOne(this.myPlayer).discriminator.gender.color // is being adapted accordingly to the new gender in /imports/game/network-vis.vue
		},
		"age": {
		  "label": Nodes.findOne(this.myPlayer).discriminator.age.label
		}
	    }}
	  );
    }
	
  }
}
</script>

<style>

</style>