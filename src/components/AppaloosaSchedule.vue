<template>
  <div class="hello">
  <div class="row">
      <div class="col-md">
          <select v-model="selectedArtist" class="form-control">
              <option :value="null">All Artists &amp; Events</option>
              <option v-for="option in allArtists" v-bind:value="option.Event" :key="option.Event">
                  {{ option.Event }}
              </option>
          </select>
      </div>

      <div class="col-md">
          <select class="form-control" v-model="selectedDay">
              <option v-for="day in allDays" v-bind:value="day" :key="day">
                  {{ day }}
              </option>
          </select>
      </div>

      <div class="col-md">
          <select class="form-control" v-model="scheduleKind">
              <option value = "all">All Scheduled</option>
              <option value = "my">My Scheduled</option>
              <option value = "shared" v-if="sharedSchedule">Shared With Me</option>
          </select>
      </div>
  </div>
    <div v-for="evtStartTime in filteredSchedule" :key="evtStartTime.StartTime">
        <div class="card mb-3">
            <div class="card-header bg-warning text-white">
                <h4>
                    {{evtStartTime.StartTime | dateFormat('h:mm A')}}
                </h4>
            </div>
            <ul v-for="evt in evtStartTime.Events" :key="evt.id" class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-auto">
                            <a style="cursor: pointer;" @click="toggleMySchedule(evt)">
                                <fa-icon class="text-warning fa-3x" :icon="evt.Icon" />
                            </a>
                        </div>
                        <div class="col">
                            <h4>
                                {{evt.Event}}
                            </h4>
                            <p class="text-muted font-weight-bold">
                                {{evt.StartTime | dateFormat('h:mm')}}-{{evt.Endtime | dateFormat('h:mm A')}}
                            </p>
                        </div>
                        <div class="col col-auto">

                            <button class="btn btn-pill" :class="'btn' + mapColor(evt.Where)">{{evt.Where}}</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
      <div class="card" v-show="filteredSchedule.length === 0">
          <h3 >
              <em>Where'd everyone go?!</em>
          </h3>
          Looks like you filtered out all the events. Don't panic. Just remove some of your filters.
          <ul>
              <li ng-show="vm.FilterStage != ''">
                  <a href="javascript:;" @click="vm.FilterStage = ''">Show All Stages</a>
              </li>

              <li ng-show="scheduleKind!=='all'">
                  <a href="javascript:;" @click="scheduleKind='all'">Show All Scheduled</a>
              </li>

              <li ng-show="vm.selectedBand !=''">
                  <a href="javascript:;" @click="vm.selectedBand = ''">Show All Artists &amp; Events</a>
              </li>
          </ul>
      </div>
  </div>

</template>

<script>
import schedule from "@/assets/schedule.json";
import Vue from "vue";
import moment from "moment";
import _ from "lodash";
import swal from "sweetalert";

const DATE_FORMAT = "ddd. M/DD";

export default {
  name: "AppaloosaSchedule",
  filters: {
    dateFormat: function(value, format) {
      return moment(value).format(format);
    }
  },
  methods: {
    toggleMySchedule(evt) {
      evt.Selected = !evt.Selected;
      Vue.set(evt.Icon, 0, evt.Selected ? "fas" : "far");
      if (evt.Selected) {
        if (localStorage.getItem("showMyEventMessage_v3") !== "bhown") {
          localStorage.setItem("showMyEventMessage_v3", "shown");
          swal({
            icon: "success",
            title: "Added to schedule",
            text:
              'When you\'re done adding, change "All Scheduled" to "My Scheduled" for your customized schedule.',
            button: "Awesome!"
          });
        }
      }
      localStorage.setItem(
        "myEvents_v3",
        JSON.stringify(
          _(this.schedule)
            .filter("Selected")
            .pluck("Id")
        )
      );
    },
    mapColor(where) {
      switch (where) {
        case "Main Stage":
          return "-danger";
        case "Saloon Stage":
          return "-primary";
        case "Workshop Zone":
          return "-default";
        case "Kids Stage":
          return "-info";
        case "Clubhouse Stage":
          return "-warning";
      }
    }
  },
  computed: {
    someEventsFavorited() {
      return _.some(this.schedule, "Selected");
    },
    allArtists() {
      return _(this.schedule)
        .uniqBy("Event")
        .sortBy("Event")
        .value();
    },
    allDays() {
      return _(this.schedule)
        .map(x => moment(x.StartTime).format(DATE_FORMAT))
        .uniq()
        .value();
    },
    filteredSchedule() {
      return _(
        this.schedule.filter(
          x =>
            (this.selectedArtist === null || x.Event === this.selectedArtist) &&
            moment(x.StartTime).format(DATE_FORMAT) === this.selectedDay &&
            (this.scheduleKind === "all" ||
              (this.scheduleKind === "my" && x.Selected))
        )
      )
        .groupBy(x => x["StartTime"])
        .map((value, key) => ({
          StartTime: key,
          Events: value
        }))
        .orderBy("StartTime")
        .value();
    }
  },

  data() {
    return {
      schedule,
      selectedArtist: null,
      selectedDay: null,
      myEvents: {},
      sharedSchedule: null,
      scheduleKind: "all"
    };
  },
  created() {
    this.schedule.forEach(x => {
      x.StartTime = new Date(x.StartTime);
      x.Endtime = new Date(x.Endtime);
      Vue.set(x, "Selected", false);
      Vue.set(x, "Icon", ["far", "star"]);
    });
    this.selectedDay = this.allDays[1];
  }
};
</script>

<style scoped lang="scss">
$primary: "red";
.btn-pill {
  border-radius: 1000em;
  width: 185px;
}
</style>
