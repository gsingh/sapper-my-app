<form name="editForm" role="form" novalidate on:submit|preventDefault="{save}" >
                <h2 id="pmillApp.production.home.createOrEditLabel">Create or edit a Production</h2>
                <div>
                {#if {production.id}
                    <div class="form-group" >
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               bind:value={production.id} readonly />
                    </div>
                {/if}    
                    <div class="form-group">
                        <label class="form-control-label" for="production-prodDate">Prod Date</label>
                        <div class="input-group">
                            <input id="production-prodDate" type="date" class="form-control" name="prodDate"  :class="{'valid': !$v.production.prodDate.$invalid, 'invalid': $v.production.prodDate.$invalid }"
                            bind:value={production.prodDate}  required />
                        </div>
                        <!-- <div v-if="$v.production.prodDate.$anyDirty && $v.production.prodDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.production.prodDate.required">
                                This field is required.
                            </small> -->
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="production-shift">Shift</label>
                        <select class="form-control" name="shift" bind.value={shift} id="production-shift"  required>
                            <option value="A" >A</option>
                            <option value="B" >B</option>
                            <option value="C" >C</option>
                        </select>
                        <!-- <div v-if="$v.production.shift.$anyDirty && $v.production.shift.$invalid">
                            <small class="form-text text-danger" v-if="!$v.production.shift.required">
                                This field is required.
                            </small>
                        </div> -->
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="production-noOfPlates">No Of Plates</label>
                        <input type="number" class="form-control" name="noOfPlates" id="production-noOfPlates"
                            bind.value={noOfPlates} />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="production-prodTonnage">Prod Tonnage</label>
                        <input type="number" class="form-control" name="prodTonnage" id="production-prodTonnage"
                            bind:value={prodTonnage} />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="production-manager">Manager</label>
                        <select class="form-control" id="production-manager" name="manager" bind:value={manager}>
                            <option v-bind:value="null"></option>
                            <option v-bind:value="production.manager && shiftManagerOption.id === production.manager.id ? production.manager : shiftManagerOption" v-for="shiftManagerOption in shiftManagers" :key="shiftManagerOption.id">{{shiftManagerOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.production.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
<script>
let isSaving =false;
let selected = '';
  async function save() {
    this.isSaving = true;
    if (this.production.id) {
      this.productionService()
        .update(this.production)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Production is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.productionService()
        .create(this.production)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Production is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }
</script>

