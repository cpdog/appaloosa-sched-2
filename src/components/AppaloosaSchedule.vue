<template>
  <div id="app">

      <nav class="navbar navbar-dark fixed-top">
          <a class="navbar-brand" href="#">
              <img src="../../public/img/icons/icon-72x72.png" height="42"/>
          </a>

          <div class="navbar-text" v-if="someEventsFavorited">
                        <span class="font-weight-bold d-none d-sm-inline">Share Your Schedule: </span>
                        <a class="mr-2" href="javascript:" @click="shareOnFacebook()" >
                            <fa-icon class="fa-2x" :icon="['fab', 'facebook-square']"></fa-icon>
                        </a>

                        <a href="javascript:" @click="emailSchedule()" >
                            <fa-icon class="fa-2x" icon="envelope"></fa-icon></a>

              </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav text-right">
                  <li class="nav-item ">
                      <a href="https://www.appaloosafestival.com" class="nav-link">
                          <fa-icon icon="home"/>
                          Home
                      </a>
                  </li>
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Sponsors</a>
                      <div class="dropdown-menu col-sm-5 col-xs-6 col-lg-3 col-md-5 text-right float-right">
                          <h6 class="dropdown-header">Platinum Sponsors</h6>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="https://timberworksva.com/">Timber Works</a>
                          <a class="dropdown-item" href="http://www.nicu.com/">NICU</a>
                          <a class="dropdown-item" href="http://exitrealty.com/office-details/F:2778">EXIT Premier Realty</a>
                          <h6 class="dropdown-header">Gold Sponsors</h6>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" href="http://www.roofsimple.com/">Roof Simple</a>
                          <a class="dropdown-item" href="http://www.renaissancemontessorischool.org/">Renaissance Montessori School</a>
                          <a class="dropdown-item" href="http://ihmcloans.com/integrity_mlo/timothy-christopher-fusaro/">Integrity Home</a>
                          <a class="dropdown-item" href="http://www.spelunkerscustard.com/">Spelunkers</a>
                          <a class="dropdown-item" href="https://scythianmusic.com/itinerary-november-2019">Scythian In Ireland</a>
                          <a class="dropdown-item" href="http://www.vaeagle.com/">Virginia Eagle</a>
                      </div>
                  </li>
              </ul>

          </div>
      </nav>
      <div class="container-fluid">
          <div class="row">
              <div class="col-md">
                  <select v-model="selectedStage" class="form-control">
                      <option :value="null">All Stages</option>
                      <option v-for="option in allStages" v-bind:value="option.Where" :key="option.Where">
                          {{ option.Where }}
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
              <div class="col-md">
                  <select class="form-control" v-model="selectedTimeEvents">
                      <option value="all">All Times</option>
                      <option value="upcoming">Upcoming</option>
                  </select>
              </div>
          </div>
          <div class="row mt-1 mb-1">
              <div class="col">
                  <select v-model="selectedArtist" class="form-control">
                      <option :value="null">All Artists &amp; Events</option>
                      <option v-for="option in allArtists" v-bind:value="option.Event" :key="option.Event">
                          {{ option.Event }}
                      </option>
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

                                    <button @click="selectedStage = evt.Where" class="btn btn-pill" :class="'btn' + mapColor(evt.Where)">{{evt.Where}}</button>
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
                      <li v-show="selectedStage !== null">
                          <a href="javascript:" @click="selectedStage = null">Show All Stages</a>
                      </li>

                      <li v-show="scheduleKind!=='all'">
                          <a href="javascript:" @click="scheduleKind='all'">Show All Scheduled</a>
                      </li>

                      <li v-show="selectedArtist !== null">
                          <a href="javascript:" @click="selectedArtist = null">Show All Artists &amp; Events</a>
                      </li>
                  </ul>
              </div>
      </div>
  </div>

</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import schedule from "@/assets/schedule.json";
import Vue from "vue";
import moment from "moment";
import _ from "lodash";
import swal from "sweetalert";
import "@/facebook";
import bigInt from "big-integer";
const DATE_FORMAT = "ddd. M/DD";

export default {
  name: "AppaloosaSchedule",
  filters: {
    dateFormat: function(value, format) {
      return moment(value).format(format);
    }
  },
  methods: {
    emailSchedule() {
      const subj = encodeURIComponent("My awesome Appaloosa schedule!");
      let msg =
        "Check out all the AMAZING bands I'm going to see at Appaloosa:\r\n";
      msg += _(schedule)
        .filter("Selected")
        .map("Event")
        .uniq()
        .value()
        .sort()
        .join("\r\n");
      msg +=
        "\n\nYou can check out my schedule here: https://appaloosa-schedule.azurewebsites.net/?shared=" +
        this.calculateShareId();

      window.open(
        "mailto:?subject=" + subj + "&body=" + encodeURIComponent(msg),
        "_self"
      );
    },

    toggleMySchedule(evt) {
      evt.Selected = !evt.Selected;
      Vue.set(evt.Icon, 0, evt.Selected ? "fas" : "far");
      if (evt.Selected) {
        if (localStorage.getItem("showMyEventMessage_v3") !== "shown") {
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
            .map("Id")
            .value()
        )
      );
    },
    shareOnFacebook() {
      window.FB.ui({
        method: "share",
        display: "popup",
        href:
          "https://appaloosa-schedule.azurewebsites.net/?shared=" +
          this.calculateShareId()
      });
    },
    calculateShareId() {
      let idBitMask = bigInt.zero;
      _(this.schedule)
        .filter("Selected")
        .forEach(x => (idBitMask = idBitMask.add(bigInt(2).pow(x.Id))));
      return idBitMask.toString();
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
        case "Gateway Stage":
          return "-dark";
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
    allStages() {
      return _(this.schedule)
        .uniqBy("Where")
        .sortBy("Where")
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
              (this.scheduleKind === "my" && x.Selected) ||
              (this.scheduleKind === "shared" && x.SharedEvent)) &&
            (this.selectedStage === null || this.selectedStage == x.Where) &&
            (this.selectedTimeEvents === "all" || x.Endtime > this.currentTime)
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
      scheduleKind: null,
      selectedStage: null,
      selectedTimeEvents: "upcoming",
      currentTime: Date.now()
    };
  },
  created() {
    let selectedEvents = JSON.parse(localStorage.getItem("myEvents_v3")) || [];
    let shared = null;

    if (window.location.search.indexOf("shared") > -1) {
      this.scheduleKind = "shared";
      this.sharedSchedule = window.location.search.match(/shared=(\d+)/)[1];
      shared = bigInt(this.sharedSchedule);
    } else {
      this.scheduleKind = "all";
    }

    this.schedule.forEach(evt => {
      evt.StartTime = new Date(evt.StartTime);
      evt.Endtime = new Date(evt.Endtime);
      Vue.set(
        evt,
        "SharedEvent",
        shared && shared.and(bigInt(2).pow(evt.Id)).neq(bigInt.zero.value)
      );
      Vue.set(evt, "Selected", selectedEvents.indexOf(evt.Id) > -1);
      Vue.set(evt, "Icon", [evt.Selected ? "fas" : "far", "star"]);
    });

    this.selectedDay = this.allDays[0];

    let self = this;
    setInterval(changeToToday, 60 * 1000);
    changeToToday();

    if (shared) {
      setupShare(this);
    }

    function changeToToday() {
      self.currentTime = Date.now();
      let indexOfUserSelection = self.allDays.indexOf(self.selectedDay);
      let indexOfToday = self.allDays.indexOf(
        moment(Date.now()).format(DATE_FORMAT)
      );
      if (
        indexOfToday > -1 &&
        self.selectedTimeEvents === "upcoming" &&
        indexOfUserSelection < indexOfToday
      ) {
        self.selectedDay = self.allDays[indexOfToday];
      }
    }

    function setupShare(component) {
      window.swal({
        icon: "info",
        title: "Someone shared a schedule with you!",
        text:
          'You\'re viewing a schedule that someone else shared with you. Probably because they\'re awesome and you\'re awesome. If you want to see all the events, change "Shared With Me" to "All Scheduled" to customize and share your own schedule!',
        button: "Awesome!"
      });

      let firstEventDay = _(component.schedule)
        .filter("SharedEvent")
        .orderBy("StartTime")
        .value()[0].StartTime;
      component.selectedDay = moment(firstEventDay).format(DATE_FORMAT);
    }
  }
};
</script>

<style scoped lang="scss">
.btn-pill {
  border-radius: 1000em;
  width: 185px;
}
.fa-2x {
  vertical-align: middle;
}
</style>
