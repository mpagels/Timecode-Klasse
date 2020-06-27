const Timecode = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  frames: 0,

  reset: function () {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.frames = 0;
  },

  pad: function (num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
  },

  format: function (string_of_tc) {
    num = this.pad(string_of_tc, 8);
    h_of_str = parseInt(num.slice(0, 2));
    m_of_str = parseInt(num.slice(2, 4));
    s_of_str = parseInt(num.slice(4, 6));
    fr_of_str = parseInt(num.slice(6, 8));

    return (
      String(this.pad(h_of_str, 2)) +
      ":" +
      String(this.pad(m_of_str, 2)) +
      ":" +
      String(this.pad(s_of_str, 2)) +
      ":" +
      String(this.pad(fr_of_str, 2))
    );
  },

  add: function (string_of_tc) {
    // if (string_of_tc.length % 2 !== 0) {
    //     return "Wrong TC Format" }

    string_of_tc = this.pad(string_of_tc, 8);

    h_of_str = parseInt(string_of_tc.slice(0, 2));
    m_of_str = parseInt(string_of_tc.slice(2, 4));
    s_of_str = parseInt(string_of_tc.slice(4, 6));
    fr_of_str = parseInt(string_of_tc.slice(6, 8));

    // Berechne Frames
    if (this.frames + fr_of_str > 24) {
      if (
        (this.frames + fr_of_str) % 25 == 0 &&
        parseInt(this.frames + fr_of_str) / 25 == 1
      ) {
        this.seconds += 1;
        this.frames = 0;
      } else {
        this.seconds += parseInt((this.frames + fr_of_str) / 25);
        this.frames = (this.frames + fr_of_str) % 25;
      }
    } else {
      this.frames += fr_of_str;
    }
    // Berechne Sekunden
    if (this.seconds > 59) {
      this.minutes += 1;
      this.seconds = 0;
    }

    if (this.seconds + s_of_str > 59) {
      if (
        (this.seconds + s_of_str) % 60 == 0 &&
        parseInt(this.seconds + s_of_str) / 60 == 1
      ) {
        this.minutes += 1;
        this.seconds = 0;
      } else {
        this.minutes += parseInt((this.seconds + s_of_str) / 60);
        this.seconds = (this.seconds + s_of_str) % 60;
      }
    } else {
      this.seconds += s_of_str;
    }
    // Berechne Minuten
    if (this.minutes > 59) {
      this.hours += 1;
      this.minutes = 0;
    }

    if (this.minutes + m_of_str > 59) {
      if (
        (this.minutes + m_of_str) % 60 == 0 &&
        parseInt(this.minutes + m_of_str) / 60 == 1
      ) {
        this.hours += 1;
        this.minutes = 0;
      } else {
        this.hours += parseInt((self.minutes + m_of_str) / 60);
        this.minutes = (self.minutes + m_of_str) % 60;
      }
    } else {
      this.minutes += m_of_str;
    }

    // Berechne Stunden
    this.hours += h_of_str;

    return (
      String(this.pad(this.hours, 2)) +
      ":" +
      String(this.pad(this.minutes, 2)) +
      ":" +
      String(this.pad(this.seconds, 2)) +
      ":" +
      String(this.pad(this.frames, 2))
    );
  }
};

const input_h1 = document.getElementById("in_half1");
const input_h2 = document.getElementById("in_half2");
const input_ot = document.getElementById("in_ot");
const erg_halb1 = document.getElementById("tc_h1");
const v_halb2 = document.getElementById("tc_h2");
const erg_halb2 = document.getElementById("tc_h1uh2");
const erg_ot = document.getElementById("tc_ot");
const erg_all = document.getElementById("tc_ges");

const timecode = function () {
  Timecode.reset();
  erg_halb1.innerHTML = Timecode.add(input_h1.value);
  if (input_h2.value !== "") {
    v_halb2.innerHTML = Timecode.format(input_h2.value);
    erg_halb2.innerHTML = Timecode.add(input_h2.value);
  }
  if (input_ot.value !== "") {
    erg_ot.innerHTML = Timecode.format(input_ot.value);
    erg_all.innerHTML = Timecode.add(input_ot.value);
  }
};

input_h1.addEventListener("change", timecode);
input_h2.addEventListener("change", timecode);
input_ot.addEventListener("change", timecode);
