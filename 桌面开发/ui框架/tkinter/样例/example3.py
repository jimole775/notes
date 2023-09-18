# -*- coding: utf-8 -*-

###########################################################################
## Python code generated with wxFormBuilder (version Oct 26 2018)
## http://www.wxformbuilder.org/
##
## PLEASE DO *NOT* EDIT THIS FILE!
###########################################################################

import wx
import wx.xrc

###########################################################################
## Class MyFrame
###########################################################################

class MyFrame ( wx.Frame ):

	def __init__( self, parent ):
		wx.Frame.__init__ ( self, parent, id = wx.ID_ANY, title = wx.EmptyString, pos = wx.DefaultPosition, size = wx.Size( 629,478 ), style = wx.DEFAULT_FRAME_STYLE|wx.TAB_TRAVERSAL )

		self.SetSizeHints( wx.DefaultSize, wx.DefaultSize )
		self.SetBackgroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_WINDOWFRAME ) )

		bSizer3 = wx.BoxSizer( wx.VERTICAL )

		fgSizer5 = wx.FlexGridSizer( 0, 2, 0, 0 )
		fgSizer5.SetFlexibleDirection( wx.BOTH )
		fgSizer5.SetNonFlexibleGrowMode( wx.FLEX_GROWMODE_SPECIFIED )

		fgSizer5.SetMinSize( wx.Size( -1,60 ) )
		self.m_staticText10 = wx.StaticText( self, wx.ID_ANY, u"项目名：", wx.DefaultPosition, wx.Size( 120,-1 ), wx.ALIGN_RIGHT )
		self.m_staticText10.Wrap( -1 )

		fgSizer5.Add( self.m_staticText10, 0, wx.ALIGN_CENTER_VERTICAL|wx.ALL, 5 )

		self.m_textCtrl1 = wx.TextCtrl( self, wx.ID_ANY, wx.EmptyString, wx.DefaultPosition, wx.Size( 380,-1 ), 0 )
		fgSizer5.Add( self.m_textCtrl1, 0, wx.ALL, 5 )


		bSizer3.Add( fgSizer5, 0, wx.EXPAND, 5 )

		fgSizer3 = wx.FlexGridSizer( 0, 2, 0, 0 )
		fgSizer3.SetFlexibleDirection( wx.BOTH )
		fgSizer3.SetNonFlexibleGrowMode( wx.FLEX_GROWMODE_SPECIFIED )

		fgSizer3.SetMinSize( wx.Size( -1,60 ) )
		self.m_staticText4 = wx.StaticText( self, wx.ID_ANY, u"保存路径：", wx.DefaultPosition, wx.Size( 120,-1 ), wx.ALIGN_RIGHT )
		self.m_staticText4.Wrap( -1 )

		self.m_staticText4.SetFont( wx.Font( 11, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_NORMAL, False, "宋体" ) )
		self.m_staticText4.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_WINDOWTEXT ) )

		fgSizer3.Add( self.m_staticText4, 0, wx.ALIGN_CENTER_VERTICAL|wx.ALIGN_RIGHT|wx.ALL, 5 )

		self.m_dirPicker1 = wx.DirPickerCtrl( self, wx.ID_ANY, wx.EmptyString, u"Select a folder", wx.DefaultPosition, wx.Size( 380,-1 ), wx.DIRP_DEFAULT_STYLE )
		self.m_dirPicker1.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_WINDOWFRAME ) )
		self.m_dirPicker1.SetBackgroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_WINDOWFRAME ) )

		fgSizer3.Add( self.m_dirPicker1, 0, wx.ALL, 5 )


		bSizer3.Add( fgSizer3, 0, wx.EXPAND, 5 )

		fgSizer21 = wx.FlexGridSizer( 0, 3, 0, 0 )
		fgSizer21.SetFlexibleDirection( wx.BOTH )
		fgSizer21.SetNonFlexibleGrowMode( wx.FLEX_GROWMODE_SPECIFIED )

		fgSizer21.SetMinSize( wx.Size( -1,50 ) )
		self.m_staticText5 = wx.StaticText( self, wx.ID_ANY, u"录制类型：", wx.DefaultPosition, wx.Size( 120,-1 ), wx.ALIGN_RIGHT )
		self.m_staticText5.Wrap( -1 )

		self.m_staticText5.SetFont( wx.Font( 11, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_NORMAL, False, "宋体" ) )
		self.m_staticText5.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_WINDOWTEXT ) )

		fgSizer21.Add( self.m_staticText5, 0, wx.ALL, 5 )

		self.m_radioBtn1 = wx.RadioButton( self, wx.ID_ANY, u"网页游戏", wx.DefaultPosition, wx.DefaultSize, 0 )
		self.m_radioBtn1.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )

		fgSizer21.Add( self.m_radioBtn1, 0, wx.ALL, 5 )

		self.m_radioBtn2 = wx.RadioButton( self, wx.ID_ANY, u"自动化测试", wx.DefaultPosition, wx.DefaultSize, 0 )
		self.m_radioBtn2.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )

		fgSizer21.Add( self.m_radioBtn2, 0, wx.ALL, 5 )


		bSizer3.Add( fgSizer21, 0, wx.EXPAND, 5 )

		self.m_staticText6 = wx.StaticText( self, wx.ID_ANY, u"配置快捷键：", wx.DefaultPosition, wx.Size( 120,-1 ), wx.ALIGN_RIGHT )
		self.m_staticText6.Wrap( -1 )

		self.m_staticText6.SetFont( wx.Font( 11, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_NORMAL, False, "宋体" ) )
		self.m_staticText6.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_WINDOWTEXT ) )

		bSizer3.Add( self.m_staticText6, 0, wx.ALL, 5 )

		fgSizer2 = wx.FlexGridSizer( 3, 4, 15, 15 )
		fgSizer2.SetFlexibleDirection( wx.BOTH )
		fgSizer2.SetNonFlexibleGrowMode( wx.FLEX_GROWMODE_SPECIFIED )

		self.m_staticText14 = wx.StaticText( self, wx.ID_ANY, u"开始录制", wx.Point( -1,-1 ), wx.Size( 100,-1 ), wx.ALIGN_RIGHT )
		self.m_staticText14.Wrap( -1 )

		self.m_staticText14.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )

		fgSizer2.Add( self.m_staticText14, 1, wx.ALIGN_CENTER_VERTICAL|wx.ALL, 5 )

		m_choice1Choices = [ u"F1", u"F2", u"F3", u"F4", u"F5", u"F6", u"F7", u"F8", u"F9", u"F10", u"F11", u"F12" ]
		self.m_choice1 = wx.Choice( self, wx.ID_ANY, wx.DefaultPosition, wx.DefaultSize, m_choice1Choices, 0 )
		self.m_choice1.SetSelection( 0 )
		self.m_choice1.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_WINDOWFRAME ) )

		fgSizer2.Add( self.m_choice1, 0, wx.ALL, 5 )

		self.m_staticText11 = wx.StaticText( self, wx.ID_ANY, u"取消录制", wx.DefaultPosition, wx.Size( 100,24 ), wx.ALIGN_RIGHT )
		self.m_staticText11.Wrap( -1 )

		self.m_staticText11.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )

		fgSizer2.Add( self.m_staticText11, 0, wx.ALIGN_CENTER_VERTICAL|wx.ALL, 5 )

		m_choice4Choices = [ u"F1", u"F2", u"F3", u"F4", u"F5", u"F6", u"F7", u"F8", u"F9", u"F10", u"F11", u"F12" ]
		self.m_choice4 = wx.Choice( self, wx.ID_ANY, wx.DefaultPosition, wx.DefaultSize, m_choice4Choices, 0 )
		self.m_choice4.SetSelection( 3 )
		fgSizer2.Add( self.m_choice4, 0, wx.ALL, 5 )

		self.m_staticText21 = wx.StaticText( self, wx.ID_ANY, u"暂停录制", wx.Point( -1,-1 ), wx.Size( -1,-1 ), wx.ALIGN_RIGHT )
		self.m_staticText21.Wrap( -1 )

		self.m_staticText21.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )
		self.m_staticText21.SetMinSize( wx.Size( 100,-1 ) )

		fgSizer2.Add( self.m_staticText21, 0, wx.ALIGN_CENTER_VERTICAL|wx.ALL, 5 )

		m_choice2Choices = [ u"F1", u"F2", u"F3", u"F4", u"F5", u"F6", u"F7", u"F8", u"F9", u"F10", u"F11", u"F12" ]
		self.m_choice2 = wx.Choice( self, wx.ID_ANY, wx.DefaultPosition, wx.DefaultSize, m_choice2Choices, 0 )
		self.m_choice2.SetSelection( 1 )
		fgSizer2.Add( self.m_choice2, 0, wx.ALL, 5 )

		self.m_staticText31 = wx.StaticText( self, wx.ID_ANY, u"重新录制", wx.Point( -1,-1 ), wx.Size( 100,24 ), wx.ALIGN_RIGHT )
		self.m_staticText31.Wrap( -1 )

		self.m_staticText31.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )

		fgSizer2.Add( self.m_staticText31, 0, wx.ALIGN_CENTER_VERTICAL|wx.ALL, 5 )

		m_choice5Choices = [ u"F1", u"F2", u"F3", u"F4", u"F5", u"F6", u"F7", u"F8", u"F9", u"F10", u"F11", u"F12" ]
		self.m_choice5 = wx.Choice( self, wx.ID_ANY, wx.DefaultPosition, wx.DefaultSize, m_choice5Choices, 0 )
		self.m_choice5.SetSelection( 4 )
		fgSizer2.Add( self.m_choice5, 0, wx.ALL, 5 )

		self.m_staticText41 = wx.StaticText( self, wx.ID_ANY, u"继续录制", wx.Point( -1,-1 ), wx.Size( -1,-1 ), wx.ALIGN_RIGHT )
		self.m_staticText41.Wrap( -1 )

		self.m_staticText41.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )
		self.m_staticText41.SetMinSize( wx.Size( 100,-1 ) )

		fgSizer2.Add( self.m_staticText41, 0, wx.ALIGN_CENTER_VERTICAL|wx.ALL, 5 )

		m_choice3Choices = [ u"F1", u"F2", u"F3", u"F4", u"F5", u"F6", u"F7", u"F8", u"F9", u"F10", u"F11", u"F12" ]
		self.m_choice3 = wx.Choice( self, wx.ID_ANY, wx.DefaultPosition, wx.DefaultSize, m_choice3Choices, 0 )
		self.m_choice3.SetSelection( 2 )
		fgSizer2.Add( self.m_choice3, 0, wx.ALL, 5 )

		self.m_staticText51 = wx.StaticText( self, wx.ID_ANY, u"退出", wx.Point( -1,-1 ), wx.Size( 100,24 ), wx.ALIGN_RIGHT )
		self.m_staticText51.Wrap( -1 )

		self.m_staticText51.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_SCROLLBAR ) )

		fgSizer2.Add( self.m_staticText51, 0, wx.ALIGN_CENTER_VERTICAL|wx.ALL, 5 )

		m_choice6Choices = [ u"F1", u"F2", u"F3", u"F4", u"F5", u"F6", u"F7", u"F8", u"F9", u"F10", u"F11", u"F12" ]
		self.m_choice6 = wx.Choice( self, wx.ID_ANY, wx.DefaultPosition, wx.DefaultSize, m_choice6Choices, 0 )
		self.m_choice6.SetSelection( 7 )
		fgSizer2.Add( self.m_choice6, 0, wx.ALL, 5 )

		bSizer3.Add( fgSizer2, 0, wx.EXPAND, 5 )

		m_sdbSizer1 = wx.StdDialogButtonSizer()
		self.m_sdbSizer1OK = wx.Button( self, wx.ID_OK )
		m_sdbSizer1.AddButton( self.m_sdbSizer1OK )
		self.m_sdbSizer1Cancel = wx.Button( self, wx.ID_CANCEL )
		m_sdbSizer1.AddButton( self.m_sdbSizer1Cancel )
		m_sdbSizer1.Realize();

		bSizer3.Add( m_sdbSizer1, 1, wx.ALIGN_CENTER, 5 )


		self.SetSizer( bSizer3 )
		self.Layout()

		self.Centre( wx.BOTH )

		# Connect Events
		self.m_sdbSizer1Cancel.Bind( wx.EVT_BUTTON, self.cancelEvent )
		self.m_sdbSizer1OK.Bind( wx.EVT_BUTTON, self.confirmEvent )

	def __del__( self ):
		pass


	# Virtual event handlers, overide them in your derived class
	def cancelEvent( self, event ):
		event.Skip()

	def confirmEvent( self, event ):
		event.Skip()




if __name__== "__main__":
    app = wx.App()
    frame = MyFrame(parent=None)
    frame.Show()
    app.MainLoop()