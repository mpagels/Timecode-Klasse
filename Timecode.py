
class Timecode:

    def __init__(self):
        self.hours = 0
        self.minutes = 0
        self.seconds = 0
        self.frames = 0

    def add(self, string_of_tc):
        if len(string_of_tc) % 2 != 0:
            return f"Wrong TC Formnat: {string_of_tc}"
        string_of_tc = string_of_tc.zfill(8)

        h_of_str    = int(string_of_tc[0:2])
        m_of_str    = int(string_of_tc[2:4])
        s_of_str    = int(string_of_tc[4:6])
        fr_of_str   = int(string_of_tc[6:])

        # Berechne Frames
        if self.frames + fr_of_str > 24:
            if ((self.frames + fr_of_str) % 25 == 0 ) and int(self.frames + fr_of_str) / 25 == 1:
                self.seconds += 1
                self.frames = 0
            else:
                self.seconds += int((self.frames + fr_of_str) / 25)
                self.frames = (self.frames + fr_of_str) % 25
        else:
            self.frames += fr_of_str

        # Berechne Sekunden
        if self.seconds > 59:
            self.minutes += 1
            self.seconds = 0

        if self.seconds + s_of_str > 59:
            if ((self.seconds + s_of_str) % 60 == 0 ) and int(self.seconds + s_of_str) / 60 == 1:
                self.minutes += 1
                self.seconds = 0
            else:
                self.minutes += int((self.seconds + s_of_str) / 60)
                self.seconds = (self.seconds + s_of_str) % 60
        else:    
            self.seconds += s_of_str
        
        #Berechne Minuten
        if self.minutes > 59:
            self.hours += 1
            self.minutes = 0

        if self.minutes + m_of_str > 59:
            if ((self.minutes + m_of_str) % 60 == 0 ) and int(self.minutes + m_of_str) / 60 == 1:
                self.hours += 1
                self.minutes = 0
            else:
                self.hours += int((self.minutes + m_of_str) / 60)
                self.minutes = (self.minutes + m_of_str) % 60
        else:    
            self.minutes += m_of_str

        #Berechne Stunden
        self.hours += h_of_str

        #self.show()
        return f"{str(self.hours).zfill(2)}:{str(self.minutes).zfill(2)}:{str(self.seconds).zfill(2)}:{str(self.frames).zfill(2)}"
        
    def reset(self):
        self.hours, self.minutes, self.seconds, self.frames = (0,0,0,0)
        self.show()

    def format(self, string_of_tc):
        if len(string_of_tc) % 2 != 0:
            return f"Wrong TC Formnat: {string_of_tc}"
        string_of_tc = string_of_tc.zfill(8)

        h_of_str    = int(string_of_tc[0:2])
        m_of_str    = int(string_of_tc[2:4])
        s_of_str    = int(string_of_tc[4:6])
        fr_of_str   = int(string_of_tc[6:])

        return f"{str(h_of_str).zfill(2)}:{str(m_of_str).zfill(2)}:{str(s_of_str).zfill(2)}:{str(fr_of_str).zfill(2)}"

    def show(self):
        return f"{str(self.hours).zfill(2)}:{str(self.minutes).zfill(2)}:{str(self.seconds).zfill(2)}:{str(self.frames).zfill(2)}"
